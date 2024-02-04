import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByArticleId(articleId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByArticleId(articleId: string): Promise<number | null>;
}
