// import './Map.css';
import React, { useEffect, useState } from 'react';
import { Stage, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';

const MapTile = () => {
  const [tileset, setTileset] = useState(null);

  const getTile = (number) => {
    let image = null
    switch(number) {
      case 0:
        image = 'dirt'
        break;
      case 1:
        image = 'exit'
        break;
      case 2:
        image = 'grass'
        break;
      case 3:
        image = 'grass2'
        break;
      case 4:
        image = 'hill'
        break;
      case 5:
        image = 'prize'
        break;
      case 6:
        image = 'water'
        break;
      case 7:
        image = 'character'
        break;                        
    }
    return image;
  }

  useEffect( async () => {

    // PIXI.Assets.load('path/to/your/tileset.png').then((asset) => {
    //   setTileset(asset);
    // });
    
    PIXI.Assets.add('dirt', './assets/maptiles/dirt.png');
    PIXI.Assets.add('exit', './assets/maptiles/exit.png');
    PIXI.Assets.add('grass', './assets/maptiles/grass.png');
    PIXI.Assets.add('grass2', './assets/maptiles/grass2.png');
    PIXI.Assets.add('hill', './assets/maptiles/hill.png');
    PIXI.Assets.add('prize', './assets/maptiles/prize.png');
    PIXI.Assets.add('water', './assets/maptiles/water.png');
    PIXI.Assets.add('character', './assets/maptiles/character.png');
    await PIXI.Assets.load([
      'dirt',
      'exit',
      'grass',
      'grass2',
      'hill',
      'prize',
      'water',
      'character',
    ]).then((assets) => {
      setTileset(assets)
    }).catch((err) => {
      console.error(error, 'error loading tiles')
    })
  }, []);

  if (!tileset) return null;

  // Map data (e.g., 2D array representing tile IDs)
  const mapData = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ];
  let tile = null;

  return (
    <Stage width={800} height={600}>
      {mapData.map((row, y) => (
        row.map((tileId, x) => (
          <Sprite
            key={`${x}-${y}`}
            texture={tileset.textures[`./assets/maptiles/${getTile(tileId)}.png`]}
            x={x * 32} // Assuming tile size is 32x32
            y={y * 32}
          />
        ))
      ))}
    </Stage>
  );
};

export default MapTile;