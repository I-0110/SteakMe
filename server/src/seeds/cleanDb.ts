import { Steak, User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Steak collection
    await Steak.deleteMany({});
    console.log('Steaks collection cleaned.');

    // Delete documents from Professor collection
    await User.deleteMany({});
    console.log('Users collection cleaned.');
  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
