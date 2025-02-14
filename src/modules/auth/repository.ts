import { Connection, Model } from 'mongoose';
import UserModel, { User } from './models/user.model';

class AuthRepository {
	private readonly userModel: Model<User>;

	constructor(private readonly db: Connection) {
		this.userModel = db.model<User>('User', UserModel.schema);
	}

	async create(user: Partial<User>): Promise<User> {
		const createdUser = await this.userModel.create(user);
		return createdUser.toJSON();
	}

	async userByIdentifier(identifier: string) {
		const userByIdentifier = await UserModel.findOne({
			$or: [
				{
					email: identifier,
				},
				{
					username: identifier,
				},
			],
			isActive: true,
		});

		return userByIdentifier;
	}
}

export default AuthRepository;
