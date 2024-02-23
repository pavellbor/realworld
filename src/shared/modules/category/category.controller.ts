import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import { CategoryService } from './category-service.inteface.js';
import { CategoryRdo } from './rdo/category.rdo.js';
import { fillDTO } from '../../helpers/common.js';
import { CreateCategoryDto } from './index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CategoryService) private readonly categoryService: CategoryService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();

    this.ok(res, fillDTO(CategoryRdo, categories));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response,
  ): Promise<void> {
    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists`,
        'CategoryContoller',
      );
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryRdo, result));
  }
}
