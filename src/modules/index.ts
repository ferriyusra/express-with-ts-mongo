import { Connection } from 'mongoose';
import AuthRepository from './auth/repository';
import AuthService from './auth/service';
import AuthController from './controllers/auth.controller';
import CategoryRepository from './category/repository';
import CategoryService from './category/service';
import CategoryController from './controllers/category.controller';

function createAuthRepository(db: Connection): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

function createCategoryRepository(db: Connection): CategoryRepository {
	return new CategoryRepository(db);
}

function createCategoryService(
	repository: CategoryRepository
): CategoryService {
	return new CategoryService(repository);
}

function createCategoryController(
	categoryService: CategoryService
): CategoryController {
	return new CategoryController(categoryService);
}

export {
	createAuthRepository,
	createAuthService,
	createAuthController,
	createCategoryRepository,
	createCategoryService,
	createCategoryController,
};
