import express, { Request, Response, NextFunction, Router } from 'express';
import aclMiddleware from '../middlewares/acl.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import categoryController from '../modules/controllers/category.controller';
import { ROLES } from '../utils/constant';
import CategoryController from '../modules/controllers/category.controller';
import { IReqUser } from '../utils/interfaces';

export class CategoryRouter {
	private router: Router;
	private categoryController: CategoryController;

	constructor(categoryController: CategoryController) {
		this.router = express.Router();
		this.categoryController = categoryController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.post(
			'/category',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, next: NextFunction) =>
				this.categoryController.create(req, res)
			/*
	#swagger.tags = ['Category']
	#swagger.security = [{
		"bearerAuth": {}
	}]
	#swagger.requestBody = {
		required: true,
		schema: {
			$ref: '#/components/schemas/CreateCategoryRequest'
		}
	}
	*/
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (categoryController: CategoryController): Router => {
	return new CategoryRouter(categoryController).getRouter();
};
