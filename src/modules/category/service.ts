import { IReqUser } from '../../utils/interfaces';
import CategoryRepository from './repository';

class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(data: IReqUser): Promise<any> {
		return this.categoryRepository.create(data);
	}
}

export default CategoryService;
