// import './Map.css';
import { React, useEffect, useState } from "react";
import { Container, AnimatedSprite, useApp, Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

const Map = () => {
  // Example map data, 0: grass, 1: dirt, 2: hill
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
  ]);

  const [tileSprites, setTileSprites] = useState({
    0: "../assets/grass.png",
    1: "../assets/dirt.png",
    2: "../assets/hill.png",
    3: "../assets/exit.png",
    4: "../assets/grass2.png",
    5: "../assets/prize.png",
    6: "../assets/water.png",
    7: "../assets/character.png",
    8: "../assets/gifs/bernese_mountain_dog/Walking.gif",
  });

  const [dogAnimation, setDogAnimation] = useState([
    "../assets/animations/dogwalk1.png",
    "../assets/animations/dogwalk2.png",
    "../assets/animations/dogwalk3.png",
    "../assets/animations/dogwalk4.png",
    "../assets/animations/dogwalk5.png",
    "../assets/animations/dogwalk6.png",
    "../assets/animations/dogwalk7.png",
    "../assets/animations/dogwalk8.png",
  ]);

  const [overlayTiles, setOverlayTiles] = useState([
    `Dogagatchi/client/components/assets/overlaytiles/apple-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/bltree-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/brtree-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/enemy1-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/enemy2-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/enemy3-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceDLcorner-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceDRcorner-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceULcorner-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceURcorner-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceVert-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/fenceVertical-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLbigrock-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLlog1-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLlogleftside-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLlogrightside-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLplant1-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLplant2-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLplant3-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLplant4-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLrubble-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLshrooms-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLsmallbush-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLsmallrock-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/OLtadpoles-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/tltree-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/trtree-Photoroom.png`,
    `Dogagatchi/client/components/assets/overlaytiles/weapon-Photoroom.png`,
  ]);

  const [dogPosition, setDogPosition] = useState([0, 0]);
  const [inputVal, setInputVal] = useState('');
  const [dogX, setDogX] = useState(0);
  const [dogY, setDogY] = useState(0);

  const moveDog = ({key}) => {
    let x = dogPosition[0];
    let y = dogPosition[1];
    console.log(key);
    switch(key){
      case 'w':
        console.log('move up');
        //setDogPosition[y + 32]
        break;
      case 'a':
        console.log('move left');
       //setDogPosition[x - 32]
        break;
      case 's':
        console.log('move down');
        //setDogPosition[y - 32]
        break;
      case 'd':
        console.log('move right');
        //setDogPosition[x + 32]
        break;
        
    }
 

  }

  const tileSize = 32; // Size of each tile in pixels

  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";

  useEffect(() => {
    document.addEventListener('keydown', moveDog);
    return () => {
      document.removeEventListener('keydown', moveDog)
    }
  })
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
        <Container position={[10, 20]}>
          <AnimatedSprite
            key={`dogPos`}
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
