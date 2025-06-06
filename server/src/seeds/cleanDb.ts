import { School, Class, Professor } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from School collection
    await School.deleteMany({});
    console.log('Schools collection cleaned.');

    // Delete documents from Class collection
    await Class.deleteMany({});
    console.log('Classes collection cleaned.');

    // Delete documents from Professor collection
    await Professor.deleteMany({});
    console.log('Professors collection cleaned.');
  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
