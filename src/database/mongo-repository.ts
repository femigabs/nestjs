import {
  FilterQuery,
  Model,
  ObjectId,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { IGenericRepository } from './generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async fetchAll(
    filter: FilterQuery<T>,
    queryOption: QueryOptions = {},
  ): Promise<T[]> {
    return this._repository.find(filter, null, queryOption).exec();
  }

  async fetch(id: string): Promise<T> {
    return this._repository
      .findById(id)
      .exec()
      .then((doc: any) => {
        if (!doc) return null;
        return doc.toJSON() as T;
      });
  }

  async fetchOneByQuery(
    query: FilterQuery<T>,
    queryOptions: QueryOptions,
    customOptions: { select: any; populate: any },
  ): Promise<T> {
    const doc = await this._repository
      .findOne({ deletedAt: null,  ...query }, null, queryOptions)
      .select(customOptions?.select || {})
      .populate(customOptions?.populate || '')
      .lean()
      .exec();

    if (!doc) return null;

    return doc as T;
  }

  async create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  async update(id: ObjectId, item: T, options: QueryOptions = { new: true }) {
    return this._repository.findByIdAndUpdate(id, item, options).exec();;
  }

  async findAndUpdate(filter: FilterQuery<T>, item: T) {
    return this._repository.findByIdAndUpdate(filter, item);
  }

  async findOneAndUpdate(filter: FilterQuery<T>, item: T, options: QueryOptions = { new: true }) {
    return this._repository.findOneAndUpdate(filter, item, options);
  }

  async upsert(
    query: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    options: QueryOptions = { upsert: true },
  ): Promise<UpdateWriteOpResult> {
    return this._repository.updateOne(query, updateQuery, options).exec();
  }
}
