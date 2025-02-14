import express, { Request, Response, NextFunction, Router } from 'express';
import AuthController from '../modules/controllers/auth.controller';

export class AuthRouter {
	private router: Router;
	private authController: AuthController;

	constructor(authController: AuthController) {
		this.router = express.Router();
		this.authController = authController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.post(
			'/auth/register',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.register(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/RegisterRequest'}
			}
			*/
		);

		this.router.post(
			'/auth/login',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.login(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/LoginRequest'}
			}
			*/
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (authController: AuthController): Router => {
	return new AuthRouter(authController).getRouter();
};
