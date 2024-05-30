import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAvatarDocument = UserAvatar & Document;

@Schema()
export class UserAvatar {
  @Prop()
  user_id: number;

  @Prop({
    required: false,
    trim: true,
    default: null
  })
  avatar: string;

  @Prop({ default: null })
  deletedAt: Date;
};

export const USERAVATARSCHEMA = SchemaFactory.createForClass(UserAvatar);