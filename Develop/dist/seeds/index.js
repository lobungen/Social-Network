//import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
//import cleanDB from './cleanDB.js';
import { userData, thoughtData } from './data.js';
async function seedDatabase() {
    try {
        //await db();
        //await cleanDB();
        // Add thoughts to the collection and await the results
        const thoughts = await Thought.insertMany(thoughtData);
        // Add users to the collection and await the results
        await User.insertMany(userData);
        // Log out the seed data to indicate what should appear in the database
        console.table(thoughts);
        console.info('Seeding complete! 🌱');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
