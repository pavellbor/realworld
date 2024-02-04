import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ArticleEntity } from '../article/index.js';
import { UserEntity } from '../user/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public text: string;

  @prop({ required: true, ref: () => ArticleEntity })
  public articleId: Ref<ArticleEntity>;

  @prop({ required: true, ref: () => UserEntity })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
