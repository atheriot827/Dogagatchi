const { Enemy } = require('../db/index');

const initialEnemies = [
  {
    name: "Stray Doberman",
    type: "wild_dog",
    breed: "doberman",
    baseHealth: 100,
    baseAttack: 15,
    sprite: "/assets/gifs/doberman/Standing.gif",
    animations: ["Standing", "Bite", "Headbutt", "Barking"],
    specialMoves: [
      {
        name: "Fierce Bite",
        damage: 20,
        animation: "Bite",
        description: "A powerful bite attack"
      },
      {
        name: "Intimidating Bark",
        damage: 15,
        animation: "Barking",
        description: "A loud bark that weakens defenses"
      }
    ],
    levelRange: { min: 1, max: 3 },
    rewards: { coins: 10, experience: 5 }
  },
  {
    name: "Dog Catcher Joe",
    type: "dog_catcher",
    baseHealth: 150,
    baseAttack: 12,
    sprite: "/assets/gifs/enemies/dog_catcher/blue_uniform/idle.gif",
    animations: [
      "idle",
      "catch",
      "walking",
      "running"
    ],
    specialMoves: [
      {
        name: "Net Throw",
        damage: 15,
        animation: "catch",
        description: "Throws a capture net"
      }
    ],
    levelRange: { min: 1, max: 4 },
    rewards: { coins: 20, experience: 10 }
  },
  {
    name: "Wild Husky",
    type: "wild_dog",
    breed: "siberian_husky",
    baseHealth: 120,
    baseAttack: 18,
    sprite: "/assets/gifs/siberian_husky/Standing.gif",
    animations: [
      "Standing",
      "Bite",
      "Headbutt",
      "Barking"
    ],
    specialMoves: [
      {
        name: "Snow Rush",
        damage: 25,
        animation: "Running",
        description: "A swift attack through the snow"
      }
    ],
    levelRange: { min: 1, max: 5 },
    rewards: { coins: 15, experience: 8 }
  }
  // Add more enemies as needed
];

const seedEnemies = async () => {
  try {
    await Enemy.deleteMany({}); // Clear existing enemies
    await Enemy.insertMany(initialEnemies);
    console.log('Enemies seeded successfully');
  } catch (error) {
    console.error('Error seeding enemies:', error);
  }
};

seedEnemies();
