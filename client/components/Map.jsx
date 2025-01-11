/* eslint-disable react/function-component-definition */
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
import PoochBattles from './PoochBattles';

const Map = () => {
  // Get the object that correlates to the current dog being walked with react-router-dom useLocation's state property, which I set earlier in dog.
  const location = useLocation();
  const navigate = useNavigate();
  const { state: dog, user } = location;

  // State for battle system
  const [showBattle, setShowBattle] = useState(false);
  const [enemyDog, setEnemyDog] = useState(null);
  const [battleActive, setBattleActive] = useState(false);

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

  // Modified to integrate with PoochBattles and backend
  const checkBattle = async () => {
    if (dogX32 === enemyX32 && dogY32 === enemyY32 && !battleActive) {
      console.log(' YOU MUST FIGHT ');

      try {
        // Get random enemy from backend, scaled to player's level
        const response = await axios.get(`/enemy/random/${dog.level || 1}`);
        const enemyData = response.data;

        setEnemyDog(enemyData);
        setShowBattle(true);
        setBattleActive(true);
      } catch (error) {
        console.error("Error fetching enemy:", error);
      }
    }
  };

  // Battle end handler
  const handleBattleEnd = async (result) => {
    setShowBattle(false);
    setBattleActive(false);

    try {
      if (result.winner === 'player') {
        // Process victory and rewards
        const response = await axios.post('/map/battle-victory', {
          dogId: dog._id,
          userId: user._id,
          rewards: result.rewards,
          healthRemaining: result.playerHealthRemaining
        });

        // Update dog stats
        if (response.data.updatedDog) {
          // Update local dog state
          console.log('Dog stats updated:', response.data.updatedDog);
        }

        // Remove enemy from current position
        setenemyX32(-100); // Move enemy off map
        setenemyY32(-100);
        setEnemyPos([-1, -1]);

        // Show victory message
        window.alert(`Victory! Earned ${result.rewards.coins} coins and ${result.rewards.experience} experience!`);
      } else {
        // Handle defeat
        await axios.post('/map/battle-defeat', {
          dogId. dog._id,
          userId: user._id
        });

        window.alert('Your dog needs rest after that battle!');
        navigate('/home');
      }
    } catch (error) {
      console.error("Error processing battle result:", error);
    }
  };

  // Modified enemy spawn logic
  const spawnEnemy = async () => {
    if (battleActive) return; // Don't spawn during battle

    const spawnPoints = [];

    // Check each map tile for valid spawn location
    mapData.forEach((row, y) => {
      row.forEach((x, index) => {
        if (!collisionDetection(index, y) &&
            Math.abs(index - dogPosition[1]) > 3 &&
            Math.abs(y - dogPosition[0]) > 3) {
          spawnPoints.push({ x: index * tileSize, y: y * tileSize });
        }
      });
    });

    if (spawnPoints.length > 0) {
      const spawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
      setenemyX32(spawn.x);
      setenemyY32(spawn.y);
      setEnemyPos([spawn.x / tileSize, spawn.y / tileSize]);
    }
  };

// Add enemy spawn interval
useEffect(() => {
  if (!battleActive) {
    const spawnTimer = setInterval(spawnEnemy, 30000); // Spawn every 30 seconds
    return () => clearInterval(spawnTimer);
  }
}, [battleActive]);

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
          console.error('error exiting map', err);
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
          console.error('error picking up item from map', err);
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
          console.error('error picking up weapon from map', err);
        });
    }
  };

  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  // Modify to include battle checking
  useEffect(() => {
    if (!battleActive) {
      checkExit();
      foundItem();
      checkBattle();
      document.addEventListener('keydown', moveDog);
      return () => {
      document.removeEventListener('keydown', moveDog);
    };
  }
}, [dogX32, dogY32, overlayTiles, battleActive]);

  //
  return (
    <div onKeyDown={!battleActive ? moveDog : null}>
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

      {/* Battle Modal */}
      <PoochBattles
        show={showBattle}
        onHide={() => setShowBattle(false)}
        playerDog={dog}
        enemyDog={enemyDog}
        onBattleEnd={handleBattleEnd}
      />
    </div>
  );
};

export default Map;
