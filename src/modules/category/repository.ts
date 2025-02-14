import { Connection, Model } from 'mongoose';
import CategoryModel, { Category } from './models/category.model';

class CategoryRepository {
	private readonly categoryModel: Model<Category>;

	constructor(private readonly db: Connection) {
		this.categoryModel = db.model<Category>('Category', CategoryModel.schema);
	}

	async create(data: any) {
		return this.categoryModel.create(data);
	}
}

export default CategoryRepository;
