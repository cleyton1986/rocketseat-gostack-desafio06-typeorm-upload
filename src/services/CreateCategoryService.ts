// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryIsExist = await categoryRepository.findOne({
      where: { title },
    });

    if (!categoryIsExist) {
      const category = categoryRepository.create({ title });
      await categoryRepository.save(category);
      return category;
    }

    return categoryIsExist;
  }
}

export default CreateCategoryService;
