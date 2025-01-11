const { Enemy } = require('../db/index');

const initialEnemies = [
  {
    name: "Stray Doberman",
    type: "wild_dog",
    breed: "doberman",
    baseHealth: 100,
    baseAttack: 15,
    sprite: "/assets/gifs/doberman/Bite.gif",
    animations: ["Standing", "Attack", "Hurt", "Defeat"],
    specialMoves: [
      {
        name: "Fierce Bite",
        damage: 20,
        animation: "Attack",
        description: "A powerful bite attack"
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
    sprite: "/assets/gifs/enemies/dog_catcher/blue_uniform/catch.gif",
    specialMoves: [
      {
        name: "Net Throw",
        damage: 15,
        animation: "Attack",
        description: "Throws a capture net"
      }
    ],
    levelRange: { min: 2, max: 5 },
    rewards: { coins: 20, experience: 10 }
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
