// import './Map.css';
import { React, useEffect, useState } from 'react';
import { Container, AnimatedSprite, useApp, Stage, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';


const Map = () => {

  const [mapData, setMapData] = useState([
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 2, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const [tileSprites, setTileSprites] = useState({
    0: '../assets/grass.png',
    1: '../assets/dirt.png',
    2: '../assets/hill.png',
    3:  '../assets/exit.png',
    4:  '../assets/grass2.png',
    5:  '../assets/prize.png',
    6:  '../assets/water.png',
    7:  '../assets/character.png',
    8:  '../assets/gifs/bernese_mountain_dog/Walking.gif'
  })
  
  const [dogAnimation, setDogAnimation] = useState([
    '../assets/animations/dogwalk1.png',
    '../assets/animations/dogwalk2.png',
    '../assets/animations/dogwalk3.png',
    '../assets/animations/dogwalk4.png',
    '../assets/animations/dogwalk5.png',
    '../assets/animations/dogwalk6.png',
    '../assets/animations/dogwalk7.png',
    '../assets/animations/dogwalk8.png'
  ]);

// Example map data, 0: grass, 1: dirt, 2: hill

  const tileSize = 32; // Size of each tile in pixels

  
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
      <Container position={[10, 20]}>
      <AnimatedSprite 
      images={dogAnimation} 
      isPlaying={true}
      initialFrame={0}
      animationSpeed={0.1}
      anchor={0.5}
      x={10} 
      y={20} 
      width={32}
      height={32}
      />
      </Container>
    </Stage>
    </div>
  );
};

 export default Map;
