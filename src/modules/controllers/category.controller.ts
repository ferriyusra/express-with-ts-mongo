import response from '../../utils/response';
import { Response } from 'express';
import { IReqUser } from '../../utils/interfaces';
import { categoryDTO } from '../category/models/category.model';
import CategoryService from '../category/service';

class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	async create(req: IReqUser, res: Response) {
		try {
			await categoryDTO.validate(req.body);
			const result = await this.categoryService.create(req.body);
			return response.success(res, result, 'Success create category');
		} catch (error) {
			return response.error(res, error, 'Failed create category');
		}
	}
}

export default CategoryController;
