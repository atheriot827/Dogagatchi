const allMaps = {
  map_DogPark: {
    mapLayout: [
      [1, 1, 1, 2, 2, 2, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0],
      [2, 1, 1, 1, 2, 2, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
      [2, 2, 1, 1, 2, 2, 2, 2, 0, 0, 0, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 0],
      [2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 2, 0, 0, 0, 0],
      [2, 2, 2, 2, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 2, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 6, 6],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 6, 6],
      [0, 0, 0, 0, 0, 1, 1, 6, 6, 6, 0, 0, 1, 1, 0, 0, 0, 0, 6, 6, 6, 6],
      [0, 2, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 1, 1, 0, 0, 0, 6, 6, 0, 6, 6],
      [0, 0, 0, 2, 0, 0, 6, 6, 6, 6, 6, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 2, 2, 6, 6, 6, 6, 6, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 2, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    ],

    overlayLayout: [
      [0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 22, 0, 0, 10, 0, 16, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 22, 0, 0, 0, 0, 0, 0, 23, 24, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 16, 0, 0, 0, 0, 2, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 17, 0, 0, 0],
      [0, 18, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
      [15, 0, 0, 11, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0],
      [0, 0, 15, 0, 0, 0, 8, 8, 8, 0, 0, 23, 24, 0, 0, 0, 0, 19, 0, 0, 0, 0],
      [0, 11, 0, 23, 24, 0, 0, 17, 0, 0, 0, 2, 3, 0, 0, 0, 0, 19, 0, 23, 24, 0],
      [0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 2, 3, 0],
      [0, 10, 0, 0, 0, 0, 0, 21, 0, 23, 24, 0, 0, 0, 14, 0, 0, 0, 23, 24, 0, 0],
      [0, 0, 0, 11, 23, 24, 0, 0, 0, 2, 3, 0, 0, 0, 21, 9, 0, 0, 2, 3, 0, 0],
      [0, 0, 11, 0, 2, 3, 0, 0, 0, 0, 0, 0, 18, 0, 0, 9, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 18, 18, 0, 0, 21, 0, 17, 0, 0, 0, 0],
      [0, 14, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 18, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 22, 0],
      [0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 10, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 10, 0, 0, 0, 0, 23, 24, 0, 0, 0, 0, 23, 24],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 24, 2, 3, 0, 0, 0, 0, 2, 3],
      [0, 25, 0, 0, 19, 0, 15, 0, 0, 11, 0, 0, 2, 3, 0, 0, 0, 0, 0, 19, 0, 0],
      [0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0],
    ],

    weaponLoc: [20, 1],
    itemLoc: [18, 4],
    exitLoc: [21, 21],

    tiles: {
      0: '../assets/grass.png',
      1: '../assets/dirt.png',
      2: '../assets/hill.png',
      3: '../assets/exit.png',
      4: '../assets/grass2.png',
      5: '../assets/prize.png',
      6: '../assets/water.png',
      7: '../assets/character.png',
      8: '../assets/gifs/bernese_mountain_dog/Walking.gif',
    },

    dogwalk: [
      '../assets/animations/DogWalk/dogwalk1.png',
      '../assets/animations/DogWalk/dogwalk2.png',
      '../assets/animations/DogWalk/dogwalk3.png',
      '../assets/animations/DogWalk/dogwalk4.png',
      '../assets/animations/DogWalk/dogwalk5.png',
      '../assets/animations/DogWalk/dogwalk6.png',
      '../assets/animations/DogWalk/dogwalk7.png',
      '../assets/animations/DogWalk/dogwalk8.png',
    ],

    enemy: [
      '../assets/animations/DogCatcher/idle-10.png',
      '../assets/animations/DogCatcher/idle-11.png',
      '../assets/animations/DogCatcher/idle-12.png',
      '../assets/animations/DogCatcher/idle-13.png',
      '../assets/animations/DogCatcher/idle-14.png',
      '../assets/animations/DogCatcher/idle-15.png',
      '../assets/animations/DogCatcher/idle-16.png',
      '../assets/animations/DogCatcher/idle-17.png',
      '../assets/animations/DogCatcher/idle-18.png',
      '../assets/animations/DogCatcher/idle-19.png',
      '../assets/animations/DogCatcher/idle-0.png',
      '../assets/animations/DogCatcher/idle-1.png',
      '../assets/animations/DogCatcher/idle-2.png',
      '../assets/animations/DogCatcher/idle-3.png',
      '../assets/animations/DogCatcher/idle-4.png',
      '../assets/animations/DogCatcher/idle-5.png',
      '../assets/animations/DogCatcher/idle-6.png',
      '../assets/animations/DogCatcher/idle-7.png',
      '../assets/animations/DogCatcher/idle-8.png',
      '../assets/animations/DogCatcher/idle-9.png',
    ],
    cow: [
      '../assets/animations/cow/enemy1-Photoroom.png',
      '../assets/animations/cow/enemy2-Photoroom.png',
      '../assets/animations/cow/enemy3-Photoroom.png',
    ],
    overlays: [
      '../assets/nothing.png', // 0
      '../assets/overlaytiles/apple-Photoroom.png', // 1
      '../assets/overlaytiles/bltree-Photoroom.png', // 2
      '../assets/overlaytiles/brtree-Photoroom.png', // 3
      '../assets/overlaytiles/fenceDLcorner-Photoroom.png', // 4
      '../assets/overlaytiles/fenceDRcorner-Photoroom.png', // 5
      '../assets/overlaytiles/fenceULcorner-Photoroom.png', // 6
      '../assets/overlaytiles/fenceURcorner-Photoroom.png', // 7
      '../assets/overlaytiles/fenceVert-Photoroom.png', // 8
      '../assets/overlaytiles/fenceVertical-Photoroom.png', // 9
      '../assets/overlaytiles/OLbigrock-Photoroom.png', // 10
      '../assets/overlaytiles/OLlog1-Photoroom.png', // 11
      '../assets/overlaytiles/OLlogleftside-Photoroom.png', // 12
      '../assets/overlaytiles/OLlogrightside-Photoroom.png', // 13
      '../assets/overlaytiles/OLplant1-Photoroom.png', // 14
      '../assets/overlaytiles/OLplant2-Photoroom.png', // 15
      '../assets/overlaytiles/OLplant3-Photoroom.png', // 16
      '../assets/overlaytiles/OLplant4-Photoroom.png', // 17
      '../assets/overlaytiles/OLrubble-Photoroom.png', // 18
      '../assets/overlaytiles/OLshrooms-Photoroom.png', // 19
      '../assets/overlaytiles/OLsmallbush-Photoroom.png', // 20
      '../assets/overlaytiles/OLsmallrock-Photoroom.png', // 21
      '../assets/overlaytiles/OLtadpoles-Photoroom.png', // 22
      '../assets/overlaytiles/tltree-Photoroom.png', // 23
      '../assets/overlaytiles/trtree-Photoroom.png', // 24
      '../assets/overlaytiles/weapon-Photoroom.png', // 25
    ],
    overlayCollidableTiles: [24, 23, 13, 12, 10, 8, 9],
    mapCollidableTiles: [2, 6],
    dogStartingPosition: [0, 0],
    enemyStartingPosition: [5, 15],
    cowStartingPosition: [5, 11],
  },
  map_MiddleOfNowhere: {
    mapLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    ],

    overlayLayout: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    weaponLoc: [13, 21], // you will need to ensure these lineup with where you place them in the overlay
    itemLoc: [21, 0],
    exitLoc: [21, 21],

    tiles: {
      0: '../assets/grass.png',
      1: '../assets/dirt.png',
      2: '../assets/hill.png',
      3: '../assets/exit.png',
      4: '../assets/grass2.png',
      5: '../assets/prize.png',
      6: '../assets/water.png',
      7: '../assets/character.png',
      8: '../assets/gifs/bernese_mountain_dog/Walking.gif',
    },

    dogwalk: [
      '../assets/animations/DogWalk/dogwalk1.png',
      '../assets/animations/DogWalk/dogwalk2.png',
      '../assets/animations/DogWalk/dogwalk3.png',
      '../assets/animations/DogWalk/dogwalk4.png',
      '../assets/animations/DogWalk/dogwalk5.png',
      '../assets/animations/DogWalk/dogwalk6.png',
      '../assets/animations/DogWalk/dogwalk7.png',
      '../assets/animations/DogWalk/dogwalk8.png',
    ],

    enemy: [
      '../assets/animations/DogCatcher/idle-10.png',
      '../assets/animations/DogCatcher/idle-11.png',
      '../assets/animations/DogCatcher/idle-12.png',
      '../assets/animations/DogCatcher/idle-13.png',
      '../assets/animations/DogCatcher/idle-14.png',
      '../assets/animations/DogCatcher/idle-15.png',
      '../assets/animations/DogCatcher/idle-16.png',
      '../assets/animations/DogCatcher/idle-17.png',
      '../assets/animations/DogCatcher/idle-18.png',
      '../assets/animations/DogCatcher/idle-19.png',
      '../assets/animations/DogCatcher/idle-0.png',
      '../assets/animations/DogCatcher/idle-1.png',
      '../assets/animations/DogCatcher/idle-2.png',
      '../assets/animations/DogCatcher/idle-3.png',
      '../assets/animations/DogCatcher/idle-4.png',
      '../assets/animations/DogCatcher/idle-5.png',
      '../assets/animations/DogCatcher/idle-6.png',
      '../assets/animations/DogCatcher/idle-7.png',
      '../assets/animations/DogCatcher/idle-8.png',
      '../assets/animations/DogCatcher/idle-9.png',
    ],

    cow: [
      '../assets/animations/cow/enemy1-Photoroom.png',
      '../assets/animations/cow/enemy2-Photoroom.png',
      '../assets/animations/cow/enemy3-Photoroom.png',
    ],
    overlays: [
      '../assets/nothing.png', // 0
      '../assets/overlaytiles/apple-Photoroom.png', // 1
      '../assets/overlaytiles/bltree-Photoroom.png', // 2
      '../assets/overlaytiles/brtree-Photoroom.png', // 3
      '../assets/overlaytiles/fenceDLcorner-Photoroom.png', // 4
      '../assets/overlaytiles/fenceDRcorner-Photoroom.png', // 5
      '../assets/overlaytiles/fenceULcorner-Photoroom.png', // 6
      '../assets/overlaytiles/fenceURcorner-Photoroom.png', // 7
      '../assets/overlaytiles/fenceVert-Photoroom.png', // 8
      '../assets/overlaytiles/fenceVertical-Photoroom.png', // 9
      '../assets/overlaytiles/OLbigrock-Photoroom.png', // 10
      '../assets/overlaytiles/OLlog1-Photoroom.png', // 11
      '../assets/overlaytiles/OLlogleftside-Photoroom.png', // 12
      '../assets/overlaytiles/OLlogrightside-Photoroom.png', // 13
      '../assets/overlaytiles/OLplant1-Photoroom.png', // 14
      '../assets/overlaytiles/OLplant2-Photoroom.png', // 15
      '../assets/overlaytiles/OLplant3-Photoroom.png', // 16
      '../assets/overlaytiles/OLplant4-Photoroom.png', // 17
      '../assets/overlaytiles/OLrubble-Photoroom.png', // 18
      '../assets/overlaytiles/OLshrooms-Photoroom.png', // 19
      '../assets/overlaytiles/OLsmallbush-Photoroom.png', // 20
      '../assets/overlaytiles/OLsmallrock-Photoroom.png', // 21
      '../assets/overlaytiles/OLtadpoles-Photoroom.png', // 22
      '../assets/overlaytiles/tltree-Photoroom.png', // 23
      '../assets/overlaytiles/trtree-Photoroom.png', // 24
      '../assets/overlaytiles/weapon-Photoroom.png', // 25
    ],
    overlayCollidableTiles: [24, 23, 13, 12, 10, 8, 9],
    mapCollidableTiles: [2, 6],
    dogStartingPosition: [0, 0],
    enemyStartingPosition: [9, 9],
    cowStartingPosition: [7, 5],
  },
};
export { allMaps };
