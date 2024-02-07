import { DocumentType, types } from '@typegoose/typegoose';
import { CategoryService } from './category-service.inteface.js';
import { CategoryEntity } from './category.entity.js';
import { CreateCategoryDto, MAX_CATEGORIES_COUNT } from './index.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { inject, injectable } from 'inversify';

@injectable()
export class DefaultCategoryService implements CategoryService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CategoryModel)
    private readonly categoryModel: types.ModelType<CategoryEntity>,
  ) {}

  public async create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const result = await this.categoryModel.create(dto);

    this.logger.info(`New category created: ${dto.name}`);

    return result;
  }

  public async findByCategoryId(categoryId: string): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findById(categoryId).exec();
  }

  public async findByCategoryName(
    categoryName: string,
  ): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findOne({ name: categoryName }).exec();
  }

  public async findByCategoryNameOrCreate(
    categoryName: string,
    dto: CreateCategoryDto,
  ): Promise<DocumentType<CategoryEntity>> {
    const existedCategory = await this.findByCategoryName(categoryName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CategoryEntity>[]> {
    return this.categoryModel.aggregate([
      {
        $lookup: {
          from: 'articles',
          let: {
            categoryId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$categoryId', '$categories'],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: 'articles',
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          articleCount: { $size: '$articles' },
        },
      },
      {
        $unset: 'articles',
      },
      {
        $limit: MAX_CATEGORIES_COUNT,
      },
      {
        $sort: {
          articleCount: SortType.Down,
        },
      },
    ]);
  }
}
