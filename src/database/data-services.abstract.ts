import { UserEntity, UserAvatarEntity } from '../common';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract user: IGenericRepository<UserEntity>;
  abstract user_avatar: IGenericRepository<UserAvatarEntity>;
}
