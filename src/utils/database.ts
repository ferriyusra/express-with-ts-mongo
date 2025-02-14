import mongoose from 'mongoose';
import logger from '../utils/logger';
import { DATABASE_URL } from './env';

async function connectDatabase(): Promise<mongoose.Connection> {
	try {
		await mongoose.connect(DATABASE_URL);
		return mongoose.connection;
	} catch (error) {
		process.exit(1);
	}
}

export { connectDatabase };
