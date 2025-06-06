import db from '../config/connection.js';
import { Schema } from 'mongoose';
import { School, Class, Professor } from '../models/index.js';
import cleanDb from './cleanDb.js';

import schoolData from './schoolData.json' with { type: 'json' };
import classData from './classData.json' with { type: 'json' };
import professorData from './professorData.json' with { type: 'json' };

try {
  await db();
  await cleanDb();

  // bulk create each model
  const schools = await School.insertMany(schoolData);
  const classes = await Class.insertMany(classData);
  const professors = await Professor.insertMany(professorData);

  for (const newClass of classes) {
    // randomly add each class to a school
    const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    tempSchool.classes.push(newClass._id as Schema.Types.ObjectId);
    await tempSchool.save();

    // randomly add a professor to each class
    const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
    newClass.professor = tempProfessor._id as Schema.Types.ObjectId;
    await newClass.save();

    // reference class on professor model, too
    tempProfessor.classes.push(newClass._id as Schema.Types.ObjectId);
    await tempProfessor.save();
  }

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
