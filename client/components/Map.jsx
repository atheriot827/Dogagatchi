// import './Map.css';
import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, AnimatedSprite, useApp, Stage, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { allMaps } from './MapFiles';

const Map = () => {
  // Get the object that correlates to the current dog being walked with react-router-dom useLocation's state property, which I set earlier in dog.
  const location = useLocation();
  const navigate = useNavigate();
  // We gain access to an exact copy of the dog & user through react hook useLocation's state
  const { state: dog, user } = location;
  const { selectedMap } = location.state;
  const [gameMap, setGameMap] = useState(allMaps[selectedMap]);
  const {
    mapLayout,
    overlayLayout,
    weaponLoc,
    itemLoc,
    exitLoc,
    tiles,
    dogwalk,
    enemy,
    overlays,
    overlayCollidableTiles,
    mapCollidableTiles,
    dogStartingPosition,
    enemyStartingPosition,
  } = gameMap;
  // Setting up map information
  const [mapData, setMapData] = useState(mapLayout);
  const [overlayData, setOverlayData] = useState(overlayLayout);
  const [tileSprites, setTileSprites] = useState(tiles);
  const [dogAnimation, setDogAnimation] = useState(dogwalk);
  const [overlayTiles, setOverlayTiles] = useState(overlays);
  const [overlayCollidable, setOverlayCollidable] = useState(
    overlayCollidableTiles
  );
  const [mapCollidable, setMapCollidable] = useState(mapCollidableTiles);
  const [enemyAnimation, setEnemyAnimation] = useState(enemy);
  // X & Y starting position values based on 32px
  const [dogX32, setdogX32] = useState(dogStartingPosition[1] * 32);
  const [dogY32, setdogY32] = useState(dogStartingPosition[0] * 32);
  const [enemyX32, setenemyX32] = useState(enemyStartingPosition[1] * 32);
  const [enemyY32, setenemyY32] = useState(enemyStartingPosition[0] * 32);
  // Positions are based on coordinates in 2D array; meaning: [y, x]
  const [enemyPos, setEnemyPos] = useState([enemyY32 / 32, enemyX32 / 32]);
  const [dogPosition, setDogPosition] = useState([dogY32 / 32, dogX32 / 32]);
  const [itemPosition, setItemPosition] = useState(itemLoc);
  const [weaponPosition, setWeaponPosition] = useState(weaponLoc);
  const [exitPosition, setExitPosition] = useState(exitLoc);
  const [inputVal, setInputVal] = useState('');

  const tileSize = 32; // Size of each tile in pixels

  const collisionDetection = (x, y) => {
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

  // Controls for the dog. Utilizes collision detection.
  const moveDog = ({ key }) => {
    // Get the current dog's position (before movement)
    let x = dogPosition[1];
    let y = dogPosition[0];

    // Handles input
    switch (key) {
      case 'w':
        y -= 1;
        // Movement is allowed if and only if within map and there will be no collision detected
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
    if (
      (dogX32 === enemyX32 && dogY32 === enemyY32) ||
      (dogPosition[0] === enemyPos[0] && dogPosition[1] === enemyPos[1])
    ) {
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
          navigate('/home');
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
        width={window.screen.width / 1.01}
        height={window.screen.height / 1.3}
      >
        <Container
          position={[window.screen.width / 3, window.screen.height / 15]}
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
        </Container>
      </Stage>
    </div>
  );
};

export default Map;
