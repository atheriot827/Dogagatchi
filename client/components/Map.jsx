// import './Map.css';
import { useMemo, useState } from 'react';
import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import MapTile from './MapTile.jsx'

const Map = () => {
  const [dogPark, setDogPark] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  // useEffect(() => {
  //   const loader = PIXI.Loader.shared;
  //   loader.add('background', './assets/maptiles/t6Hry.jpg');
  //   loader.load((loader, resources) => {
  //     if (stageRef.current) {
  //       const background = new PIXI.Sprite(resources.background.texture);
  //       background.width = stageRef.current.width;
  //       background.height = stageRef.current.height;
  //       stageRef.current.addChild(background);
  //     }
  //   });
  // }, []);

  return (

          <MapTile/>

  );
};
///
export default Map;