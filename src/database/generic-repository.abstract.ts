import {
  FilterQuery,
  ObjectId,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

export abstract class IGenericRepository<T> {
  abstract fetchAll(
    query: FilterQuery<T>,
    queryOption?: QueryOptions,
  ): Promise<T[]>;

  abstract fetch(id: string): Promise<T>;

  abstract fetchOneByQuery(
    query: FilterQuery<T>,
    queryOption?: QueryOptions,
    customOptions?: any,
  ): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: ObjectId, item: T, options?: QueryOptions): Promise<T>;

  abstract findAndUpdate(filter: FilterQuery<T>, item: T): Promise<T>;

  abstract findOneAndUpdate(filter: FilterQuery<T>, item: T, options?: QueryOptions): Promise<T>;

  abstract upsert(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult>;
}
