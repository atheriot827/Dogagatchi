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
};

const Map = () => {
  return (
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
    </Stage>
  );
};

export default Map;
