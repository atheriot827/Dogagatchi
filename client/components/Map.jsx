// import './Map.css';
import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, AnimatedSprite, useApp, Stage, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import {
  enemy,
  overlays,
  dogwalk,
  tiles,
  mapLayout,
  overlayLayout,
  itemLoc,
  weaponLoc,
  exitLoc,
} from './MapFiles';

const Map = () => {
  // Get the object that correlates to the current dog being walked with react-router-dom useLocation's state property, which I set earlier in dog.
  const location = useLocation();
  const navigate = useNavigate();
  const { state: dog, user } = location;
  // Setting up map information
  const [mapData, setMapData] = useState(mapLayout);
  const [overlayData, setOverlayData] = useState(overlayLayout);
  const [tileSprites, setTileSprites] = useState(tiles);
  const [dogAnimation, setDogAnimation] = useState(dogwalk);
  const [overlayTiles, setOverlayTiles] = useState(overlays);
  const [enemyAnimation, setEnemyAnimation] = useState(enemy);
  // I chose to base these values off of 32 bits per square tile
  const [enemyX32, setenemyX32] = useState(480);
  const [enemyY32, setenemyY32] = useState(160);
  // enemy position is based on 32 bits
  const [enemyPos, setEnemyPos] = useState([enemyX32 / 32, enemyY32 / 32]); // The enemy position is based on  coordinates in map
  const [itemPosition, setItemPosition] = useState(itemLoc);
  const [weaponPosition, setWeaponPosition] = useState(weaponLoc);
  const [exitPosition, setExitPosition] = useState(exitLoc);
  const [inputVal, setInputVal] = useState('');
  const [dogX32, setdogX32] = useState(0);
  const [dogY32, setdogY32] = useState(0);
  const [dogPosition, setDogPosition] = useState([0, 0]);

  const tileSize = 32; // Size of each tile in pixels

  const collisionDetection = (x, y) => {
    const overlayCollidable = [24, 23, 13, 12, 10, 8, 9];
    const mapCollidable = [2, 6];
    if (mapCollidable.includes(mapLayout[y][x])) {
      return true;
    }
    if (overlayCollidable.includes(overlayLayout[y][x])) {
      return true;
    }
    return false;
  };

  const updatePos = (index, newValue, index2, itemOrWeapon) => {
    if (index2 === undefined) {
      setDogPosition((prevPosition) => {
        const newPos = [...prevPosition];
        newPos[index] = newValue;
        return newPos;
      });
    }
  };

  const moveDog = ({ key }) => {
    let x = dogPosition[1];
    let y = dogPosition[0];
    console.log(dogPosition, 'the dog position');
    console.log(itemPosition, 'the item Position');
    switch (key) {
      case 'w':
        y -= 1;
        if (!(dogY32 - 32 < 0) && !collisionDetection(x, y)) {
          setdogY32(dogY32 - 32);
          updatePos(0, y);
        }
        break;
      case 'a':
        x -= 1;
        if (!(dogX32 - 32 < 0) && !collisionDetection(x, y)) {
          setdogX32(dogX32 - 32);
          updatePos(1, x);
        }
        break;
      case 's':
        y += 1;
        if (
          !(dogY32 + 32 >= tileSize * mapData.length) &&
          !collisionDetection(x, y)
        ) {
          setdogY32(dogY32 + 32);
          updatePos(0, y);
        }
        break;
      case 'd':
        x += 1;
        if (
          !(dogX32 + 32 >= tileSize * mapData[0].length) &&
          !collisionDetection(x, y)
        ) {
          setdogX32(dogX32 + 32);
          updatePos(1, x);
        }
        break;
      default:
        console.log('PLEASE USE "WASD" CONTROLS');
    }
  };

  const checkBattle = () => {
    if (dogX32 === enemyX32 && dogY32 === enemyY32) {
      console.log(' YOU MUST FIGHT ');
    }
  };

  const checkExit = () => {
    if (
      dogPosition[0] === exitPosition[0] &&
      dogPosition[1] === exitPosition[1]
    ) {
      console.log(' YOU FIND THE EXIT!');
      axios
        .post('map/exit', { walkerInfo: dog, user })
        .then(() => {
          window.alert(
            'You have walked your Dog! They will now be a little hungrier but much healthier!'
          );
          navigate('/user');
        })
        .catch((err) => {
          console.error('error exiting map');
        });
    }
    // if (dogX32 === exitX && dogY32 === exitY) {
    // }
  };

  // This function unsuccessfully removes the tile
  const removeOverlayTile = (index, index2) => {
    const copy = overlayTiles.slice(0);
    copy[index][index2] = 0;
    setOverlayTiles(copy);
    // setOverlayTiles((prevMap) => {
    //   console.log(prevMap);
    //   const newMap = [...prevMap];
    //   newMap[index][index2] = 0;
    //   return newPos;
    // });
  };

  const foundItem = () => {
    if (
      dogPosition[0] === itemPosition[0] &&
      dogPosition[1] === itemPosition[1]
    ) {
      console.log(' YOU FIND AN ITEM!');
      setItemPosition([undefined, undefined]);
      // removeOverlayTile(dogPosition[0], dogPosition[1]); This is not the best method for removing the tile
      axios
        .post('map/item', { walkerInfo: dog, user })
        .then(() => {
          window.alert('Your dog becomes slightly healthier!');
        })
        .catch((err) => {
          console.error('error picking up item from map');
        });
    }
    if (
      dogPosition[0] === weaponPosition[0] &&
      dogPosition[1] === weaponPosition[1]
    ) {
      console.log(' YOU FIND A WEAPON!');
      setWeaponPosition([undefined, undefined]);
      // removeOverlayTile(dogPosition[0], dogPosition[1]);
      axios
        .post('map/item', { walkerInfo: dog, user })
        .then(() => {
          window.alert('Your dog becomes slightly stronger!');
        })
        .catch((err) => {
          console.error('error picking up weapon from map');
        });
    }
  };

  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  useEffect(() => {
    checkExit();
    foundItem();
    checkBattle();
    document.addEventListener('keydown', moveDog);
    return () => {
      document.removeEventListener('keydown', moveDog);
    };
  }, [dogX32, dogY32, overlayTiles]);
  //
  return (
    <div onKeyDown={moveDog}>
      <Stage
        width={tileSize * mapData[0].length}
        height={tileSize * mapData.length}
      >
        {mapData.map((row, y) =>
          row.map((tile, x) => (
            <Sprite
              key={`${x}-${y}`}
              image={tileSprites[tile]}
              x={x * tileSize}
              y={y * tileSize}
            />
          ))
        )}
        {overlayData.map((row, y) =>
          row.map((tile, x) => (
            <Sprite
              key={`${x}-${y}`}
              image={overlayTiles[tile]}
              x={x * tileSize}
              y={y * tileSize}
            />
          ))
        )}
        <Container position={[16, 16]}>
          <AnimatedSprite
            key='enemyPos'
            images={enemyAnimation}
            isPlaying
            initialFrame={0}
            animationSpeed={0.1}
            anchor={0.5}
            x={enemyX32}
            y={enemyY32}
            width={32}
            height={32}
          />
        </Container>
        <Container position={[16, 16]}>
          <AnimatedSprite
            key='dogPos'
            images={dogAnimation}
            isPlaying
            initialFrame={0}
            animationSpeed={0.1}
            anchor={0.5}
            x={dogX32}
            y={dogY32}
            width={32}
            height={32}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Map;
