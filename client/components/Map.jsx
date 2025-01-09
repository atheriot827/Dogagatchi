// import './Map.css';
import { React, useEffect, useState } from 'react';
import { Container, AnimatedSprite, useApp, Stage, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import {
  enemy,
  overlays,
  dogwalk,
  tiles,
  mapLayout,
  overlayLayout,
} from './MapFiles';

const Map = () => {
  // Example map data, 0: grass, 1: dirt, 2: hill
  const [mapData, setMapData] = useState(mapLayout);
  const [overlayData, setOverlayData] = useState(overlayLayout);
  const [tileSprites, setTileSprites] = useState(tiles);

  const [dogAnimation, setDogAnimation] = useState(dogwalk);

  const [overlayTiles, setOverlayTiles] = useState(overlays);
  const [enemyAnimation, setEnemyAnimation] = useState(enemy);
  const [enemyX, setEnemyX] = useState(480);
  const [enemyY, setEnemyY] = useState(160);
  const [enemyPos, setEnemyPos] = useState([enemyX, enemyY]);
  const [inputVal, setInputVal] = useState('');
  const [dogX, setDogX] = useState(0);
  const [dogY, setDogY] = useState(0);
  const [dogPosition, setDogPosition] = useState([0, 0]);

  const tileSize = 32; // Size of each tile in pixels
  const moveDog = ({ key }) => {
    let x = dogPosition[0];
    let y = dogPosition[1];
    console.log(dogPosition)
    
    if (collisionDetection(x, y)) {
      console.log('collision detected');
    }
    switch (key) {
      case 'w':
        if (!(dogY - 32 < 0)) {
          setDogY(dogY - 32);
          y = y - 1;
          updatePos(1, y);
        }
        break;
      case 'a':
        if (!(dogX - 32 < 0)) {
          setDogX(dogX - 32);
          x = x - 1;
          updatePos(0, x);
        }
        break;
      case 's':
        if (!(dogY + 32 >= tileSize * mapData.length)) {
          setDogY(dogY + 32);
          y = y + 1;
          updatePos(1, y);
        }
        break;
      case 'd':
        if (!(dogX + 32 >= tileSize * mapData[0].length)) {
          setDogX(dogX + 32);
          x = x + 1;
          updatePos(0, x);
        }
        break;
      default:
        console.log('PLEASE USE "WASD" CONTROLS');
    }
  };

  const checkBattle = () => {
    if (dogX === enemyX && dogY === enemyY) {
      console.log(' YOU MUST FIGHT ');
    }
  };

  const updatePos = (index, newValue) => {
    setDogPosition((prevPosition) => {
      const newPos = [...prevPosition];
      newPos[index] = newValue;
      return newPos;
    });
  };

  const collisionDetection = (x, y) => {
    const overlayCollidable = [24, 23, 13, 12, 10, 8, 9];
    const mapCollidable = [2, 6];
    console.log(mapLayout[x][y])
    if (mapCollidable.includes(mapLayout[x][y])) {
      return true;
    }
    if (overlayCollidable.includes(overlayLayout[x][y])) {
      return true;
    }
    return false;
  };

  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  useEffect(() => {

    checkBattle();
    document.addEventListener('keydown', moveDog);
    return () => {
      document.removeEventListener('keydown', moveDog);
    };
  }, [dogX, dogY]);
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
            key={`enemyPos`}
            images={enemyAnimation}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.1}
            anchor={0.5}
            x={enemyX}
            y={enemyY}
            width={32}
            height={32}
          />
        </Container>
        <Container position={[16, 16]}>
          <AnimatedSprite
            key={`dogPos`}
            images={dogAnimation}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.1}
            anchor={0.5}
            x={dogX}
            y={dogY}
            width={32}
            height={32}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Map;
