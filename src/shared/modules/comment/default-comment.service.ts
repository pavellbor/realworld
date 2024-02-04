import { DocumentType, types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) public readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    return comment.populate('userId');
  }

  public async findByArticleId(articleId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ articleId }).populate('userId');
  }

  public async deleteByArticleId(articleId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({ articleId }).exec();

    return result.deletedCount;
  }
}
