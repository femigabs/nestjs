import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  User, 
  UserDocument,
  UserAvatar,
  UserAvatarDocument
} from './models';
import { IDataServices } from './data-services.abstract';
import { MongoGenericRepository } from './mongo-repository';

@Injectable()
export class MongoDataServices
implements IDataServices, OnApplicationBootstrap
{
  user: MongoGenericRepository<User>;
  user_avatar: MongoGenericRepository<UserAvatar>;

  constructor(
    @InjectModel(User.name)
    private readonly _userRepository: Model<UserDocument>,
    @InjectModel(UserAvatar.name)
    private readonly _userAvatarRepository: Model<UserAvatarDocument>,
  ) {}

  onApplicationBootstrap() {
    this.user = new MongoGenericRepository<User>(
      this._userRepository,
    );
    this.user_avatar = new MongoGenericRepository<UserAvatar>(
      this._userAvatarRepository,
    );
  }
}
