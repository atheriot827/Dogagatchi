// // import './Map.css';
// import React, { useEffect, useState } from 'react';
// import { Stage, Sprite, useApp } from '@pixi/react';
// import * as PIXI from 'pixi.js';

// const MapTile = () => {
//   const [tileset, setTileset] = useState(null);

//   const getTile = (number) => {
//     let image = null
//     switch(number) {
//       case 0:
//         image = 'dirt'
//         break;
//       case 1:
//         image = 'exit'
//         break;
//       case 2:
//         image = 'grass'
//         break;
//       case 3:
//         image = 'grass2'
//         break;
//       case 4:
//         image = 'hill'
//         break;
//       case 5:
//         image = 'prize'
//         break;
//       case 6:
//         image = 'water'
//         break;
//       case 7:
//         image = 'character'
//         break;                        
//     }
//     return image;
//   }

//   useEffect( async () => {

//     // PIXI.Assets.load('path/to/your/tileset.png').then((asset) => {
//     //   setTileset(asset);
//     // });
    
//     PIXI.Assets.add({ alias: 'dirt', src: './assets/maptiles/dirt.png'});
//     PIXI.Assets.add({ alias: 'exit', src:  './assets/maptiles/exit.png'});
//     PIXI.Assets.add({ alias: 'grass', src:  './assets/maptiles/grass.png'});
//     PIXI.Assets.add({ alias: 'grass2',  src: './assets/maptiles/grass2.png'});
//     PIXI.Assets.add({ alias: 'hill',  src: './assets/maptiles/hill.png'});
//     PIXI.Assets.add({ alias: 'prize', src:  './assets/maptiles/prize.png'});
//     PIXI.Assets.add({ alias: 'water',  src: './assets/maptiles/water.png'});
//     PIXI.Assets.add({ alias: 'character', src: './assets/maptiles/character.png'});
//     await PIXI.Assets.load([
//       'dirt',
//       'exit',
//       'grass',
//       'grass2',
//       'hill',
//       'prize',
//       'water',
//       'character',
//     ]).then((assets) => {
//       setTileset(assets)
//     }).catch((err) => {
//       console.error(err, 'error loading tiles')
//     })
//   }, []);

//   if (!tileset) return null;

//   // Map data (e.g., 2D array representing tile IDs)
//   const mapData = [
//     [0, 1, 0],
//     [1, 0, 1],
//     [0, 1, 0],
//   ];
//   let tile = null;

//   return (
//     <Stage width={800} height={600}>
//       {mapData.map((row, y) => (
//         row.map((tileId, x) => (
//           <Sprite
//             key={`${x}-${y}`}
//             texture={tileset.textures[`${getTile(tileId)}.png`]}
//             x={x * 32} // Assuming tile size is 32x32
//             y={y * 32}
//           />
//         ))
//       ))}
//     </Stage>
//   );
// };

// export default MapTile;