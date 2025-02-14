import AuthRepository from './repository';

class AuthService {
	constructor(private readonly authRepository: AuthRepository) {}

	async register(data: any): Promise<any> {
		const { fullName, username, email, password } = data;
		return this.authRepository.create({
			fullName,
			email,
			username,
			password,
		});
	}

	async userByIdentifier(identifier: string): Promise<any> {
		return this.authRepository.userByIdentifier(identifier);
	}
}

export default AuthService;
