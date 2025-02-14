import { Request, Response } from 'express';
import AuthService from '../auth/service';
import response from '../../utils/response';
import UserModel, { userDTO, userLoginDTO } from '../auth/models/user.model';
import { encrypt } from '../../utils/encryption';
import { generateToken } from '../../utils/jwt';

class AuthController {
	constructor(private readonly authService: AuthService) {}

	async register(req: Request, res: Response) {
		try {
			const { fullName, username, email, password, confirmPassword } = req.body;
			await userDTO.validate({
				fullName,
				username,
				email,
				password,
				confirmPassword,
			});

			const result = await this.authService.register({
				fullName,
				email,
				username,
				password,
			});

			return response.success(res, result, 'User registered successfully');
		} catch (error) {
			return response.error(res, error, 'User registration failed');
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { identifier, password } = req.body;
			await userLoginDTO.validate({
				identifier,
				password,
			});

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

			if (!userByIdentifier) {
				return response.unauthorized(res, 'User not found');
			}

			const validatePassword: boolean =
				encrypt(password) === userByIdentifier.password;

			if (!validatePassword) {
				return response.unauthorized(res, 'User not found');
			}

			const token = generateToken({
				id: userByIdentifier._id,
				role: userByIdentifier.role,
			});
			return response.success(res, token, 'Login success');
		} catch (error) {
			return response.error(res, error, 'Login failed');
		}
	}
}

export default AuthController;
