export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  CategoryModel: Symbol.for('CategoryModel'),
  CategoryService: Symbol.for('CategoryService'),
  ArticleModel: Symbol.for('ArticleModel'),
  ArticleService: Symbol.for('ArticleService'),
} as const;
