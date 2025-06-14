import mongoose from 'mongoose';
import Steak from '../models/Steak.js';

import steakData from './steakData.json';

mongoose.connect('mongodb://127.0.0.1:27017/steak-selector');

async function seed() {
  await Steak.deleteMany({});
  await Steak.insertMany(steakData);
  console.log('Seed complete!');
  process.exit();
}

seed();

// import db from '../config/connection.js';

// import { Steak, User } from '../models/index.js';
// import cleanDb from './cleanDb.js';

// import steakData from './steakData.json' with { type: 'json' };
// import userData from './userData.json' with { type: 'json' };

// const seed = async () => {
// try {
//   await db(); // Connect to db
//   await cleanDb(); //Clear existing data

//   interface IUserSeed {
//     name: string;
//     email: string;
//     password: string;
//     answers: {
//       priority: string;
//       doneness: string;
//       recommendation: string;
//     }[];
//     favoriteId?: string[];
//   }

//   // bulk create each model
//   const users: IUserSeed[] = userData;
//   const steaks = await Steak.insertMany(steakData);

//   for (const user of users) {
//     // Create users with linked favorite steak ID.
//     const { answers } = user;

//     if (answers?.length) {
//       // Find the recommended steak from answers
//       const recommendationName = answers[0].recommendation;
//       const matchingSteak = steaks.find(steak => steak.name === recommendationName);

//       if (matchingSteak) {
//         user.favoriteId = [matchingSteak._id.toString()];
//       }
//     }

//     // Save user
//     const newUser = new User(user);
//     await newUser.save();
//   }

//   console.log('Seeding completed successfully!');
//   process.exit(0);
// } catch (error) {
//   console.error('Error seeding database:', error);
//   process.exit(1);
// }};

// seed();
