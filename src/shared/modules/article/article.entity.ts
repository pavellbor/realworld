import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ArticleType } from '../../types/index.js';
import { CategoryEntity } from '../category/index.js';
import { UserEntity } from '../user/index.js';

export interface ArticleEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'articles',
  },
})
export class ArticleEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title: string;

  @prop({ trim: true })
  public body: string;

  @prop()
  public postDate: Date;

  @prop()
  public image: string;

  @prop({
    _id: false,
    ref: () => CategoryEntity,
  })
  public categories: Ref<CategoryEntity>[];

  @prop({
    enum: ArticleType,
  })
  public type: ArticleType;

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public userId: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount: number;
}

export const ArticleModel = getModelForClass(ArticleEntity);
