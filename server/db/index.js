// 0. Index is the Entry point
// require mongoose after running npm install mongodb
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { ATLAS_URI } = require('../config');

mongoose
  .connect(ATLAS_URI) // Changed this to fix mongodb atlas connection
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

// setup schema(s)
const userSchema = new mongoose.Schema({
  username: String,
  password: String, // may be changed with passport implementation
  coinCount: Number, // increments with correct question and decrements to feed play with dog
  questionCount: Number, // increments with correct answer and stays
  dogCount: Number, // increments when dogogatchi is creates and decrements if dogogatchi is deleted
  breeds: [String], // array of image strings that are correctly answered
  achievements: [{ name: String, image: String, description: String }],
  meals: [
    {
      name: String,
      image: String,
      idMeal: Number,
      cost: Number,
      fullTime: String,
    },
  ],
  activities: [String],
  medicines: [
    {
      name: String,
      image: String,
      idMedicine: Number,
      cost: Number,
      fullTime: String,
    },
  ],
  img: String,
});
// creates user docs in the db
const User = mongoose.model('User', userSchema);

// schema for Dogs
const dogSchema = new mongoose.Schema({
  name: String,
  img: String, // breed
  feedDeadline: Date, // timers
  walkDeadline: Date, // timers
  medicineDeadline: Date,
  vitalityDeadline: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isGroomed: Boolean,
  activities: [String],
  health: {
    type: Number,
    default: 100,
    min: 25,
    max: 100,
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  attackDmg: {
    type: Number,
    default: 25,
    min: 25,
    max: 100,
  },
  agility: {
    // The agility of the dog is updated via walking
    type: Number,
    default: 20,
    min: 1,
    max: 100,
  },
  walksTaken: {
    // Number of walks the current dog has been taken on.
    type: Number,
    default: 0,
  },
  vitality: {
    // The vitality of the current dog.
    type: Number,
    default: 0,
  },

  commands: {
    type: [String],
    default: [
      'healing magic drop the beat fix this dog from head to feet',
      'power surging through this pup strength and speed now level up',
      'stupid dog',
      'baller',
    ],
  },
  exp: {
    type: Number,
    default: 0,
  },
  discipline: {
    type: Number,
    default: 0,
  },
});

dogSchema.methods.calculateLevel = function () {
  // Example: Level up every 100 experience points
  return Math.floor(this.experience / 100) + 1;
};

const Dog = mongoose.model('Dog', dogSchema);

// Schema for Enemies
const enemySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['wild_dog', 'dog_catcher', 'stray_cat', 'rival_trainer'],
    required: true,
  },
  baseHealth: {
    type: Number,
    default: 100,
    min: 50,
    max: 200,
  },
  baseAttack: {
    type: Number,
    default: 10,
    min: 5,
    max: 50,
  },
  // For wild dogs
  breed: {
    type: String,
    required() {
      return this.type === 'wild_dog';
    },
  },
  sprite: {
    type: String,
    required: true,
  },
  // Not sure about these yet
  animations: {
    type: [String],
    default: ['Standing', 'Attack', 'Hurt', 'Defeat'],
  },
  specialMoves: [
    {
      name: String,
      damage: Number,
      animation: String,
      description: String,
    },
  ],
  levelRange: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 5 },
  },
  rewards: {
    coins: { type: Number, default: 10 },
    experience: { type: Number, default: 5 },
  },
});

const Enemy = mongoose.model('Enemy', enemySchema);

// Schema for Dog Shop
const dogShopSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  available: {
    type: Boolean,
    default: true,
  },
  animations: {
    type: [String],
    default: [
      'Barking',
      'Bite',
      'Dying',
      'Headbutt',
      'Jump',
      'LayingDown',
      'Running',
      'Sitting',
      'Sleeping',
      'Standing',
      'Walking',
    ],
  },
  stats: {
    baseHealth: {
      type: Number,
      default: 100,
    },
    baseAttack: {
      type: Number,
      default: 10,
    },
    baseDefense: {
      type: Number,
      default: 5,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DogShop = mongoose.model('DogShop', dogShopSchema);

const wordSchema = new mongoose.Schema({
  word: String,
  phonetic: String,
  meanings: [{ partOfSpeech: String, definitions: [String] }],
  dogtionary: Boolean,
  favorite: Boolean,
  used: Boolean,
  dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
});

const Word = mongoose.model('Word', wordSchema);

module.exports = {
  DogShop,
  Word,
  User,
  Dog,
  Enemy,
};
