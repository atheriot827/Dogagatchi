// import './Map.css';
import React from 'react';
import { Stage, Sprite } from '@pixi/react';

const tileSize = 32; // Size of each tile in pixels
const mapData = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 2, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]; // Example map data, 0: grass, 1: wall, 2: treasure

const tileSprites = {
  0: '../assets/grass.png',
  1: '../assets/dirt.png',
  2: '../assets/hill.png',
  3:  '../assets/exit.png',
  4:  '../assets/grass2.png',
  5:  '../assets/prize.png',
  6:  '../assets/hill.png',
  7:  '../assets/character.png',
};

const Map = () => {

  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  return (
    <div>
    <Stage width={tileSize * mapData[0].length} height={tileSize * mapData.length}>
      {mapData.map((row, y) => (
        row.map((tile, x) => (
          <Sprite
            key={`${x}-${y}`}
            image={tileSprites[tile]}
            x={x * tileSize}
            y={y * tileSize}
          />
        ))
      ))}
      <Sprite image={tileSprites[7]} x={10} y={20} />
      
    </Stage>
    </div>
  );
};

export default Map;
