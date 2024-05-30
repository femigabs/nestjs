import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { HelperService, ResponseService, UserEntity, AxiosService, FileService, UserAvatarEntity } from '../common';
import { IDataServices } from '../database';
import { CreateUserDto } from '../dtos';
import { RabbitMQService } from '../config';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService {
    constructor(
        private readonly databaseService: IDataServices,
        private readonly responseService: ResponseService,
        private readonly rabbitMQService: RabbitMQService,
        private readonly helperService: HelperService,
        private readonly configService: ConfigService,
        private readonly axiosService: AxiosService,
        private readonly fileService: FileService,
    ) { }

    async createUser(data: CreateUserDto): Promise<UserEntity> {
        try {
            const RABBITMQ_TOPIC1 = this.configService.get<string>('RABBITMQ_TOPIC1');
            const email = data.email;

            const user = await this.databaseService.user.fetchOneByQuery({ email: email });

            if (user) throw new Error('User already exits');

            const createUser = await this.databaseService.user.create(data);

            await this.helperService.sendEmail(email);

            await this.rabbitMQService.RabbitMQPublisher(RABBITMQ_TOPIC1, data);

            return createUser;

        } catch (error) {
            throw this.responseService.generateErrorResponse(error.message, error?.code);
        }
    };

    async getUserById(userId: string): Promise<any> {
        try {
            const regresBareUrl = this.configService.get<string>('REQRES_BASE_URL');
            const getUserUrl = `${regresBareUrl}/api/users/${userId}`;

            const response: any = await this.axiosService.get(getUserUrl);

            return response.data;
        } catch (error) {
            throw this.responseService.generateErrorResponse(error.message, error?.code);
        };
    };

    async downloadNewAvatar(userId: number, url: string, new_user: boolean): Promise<string> {
        const response: any = await this.axiosService.get(url);
        const avatarUrl = response?.data?.avatar;

        const avatarResponse: any = await this.fileService.downloadImage(avatarUrl);

        (new_user) ? await this.databaseService.user_avatar.create({ user_id: userId, avatar: avatarResponse.hash })
            : await this.databaseService.user_avatar.findOneAndUpdate({ user_id: userId, deletedAt: null }, { avatar: avatarResponse.hash });

        const base64Avatar = avatarResponse.buffer.toString('base64');

        return base64Avatar;
    };

    async getUserAvatar(userId: string): Promise<UserAvatarEntity> {
        try {
            const user_id = Number(userId)
            const regresBareUrl = this.configService.get<string>('REQRES_BASE_URL');
            const getUserUrl = `${regresBareUrl}/api/users/${userId}`;

            const user = await this.databaseService.user_avatar.fetchOneByQuery({ user_id: user_id });

            if (user?.avatar) {
                const path = `${__dirname}/../../src/avatars/${user.avatar}.jpg`;

                // for cases when you have an avatar in the database but no file
                if (!fs.existsSync(path)) {
                    const base64Avatar = await this.downloadNewAvatar(user_id, getUserUrl, false);

                    user.avatar = base64Avatar;

                    return user;
                };

                const imageBuffer = fs.readFileSync(path);
                const base64Avatar = imageBuffer.toString('base64');

                user.avatar = base64Avatar;

                return user;
            };

            const base64Avatar = await this.downloadNewAvatar(user_id, getUserUrl, true);

            return {
                avatar: base64Avatar,
                user_id: user_id
            };

        } catch (error) {
            throw this.responseService.generateErrorResponse(error.message, error?.code);
        }
    };

    async deleteUserAvatar(userId: string): Promise<null> {
        try {
            const user = await this.databaseService.user_avatar.fetchOneByQuery({ user_id: userId, deletedAt: null });

            if (!user) throw new Error('User avatar not found');

            const path = `${__dirname}/../../src/avatars/${user.avatar}.jpg`;
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            };

            await this.databaseService.user_avatar.findOneAndUpdate({ user_id: userId, deletedAt: null }, { deletedAt: new Date() }, { new: true });

            return null;

        } catch (error) {
            throw this.responseService.generateErrorResponse(error.message, error?.code);
        }

    };
};
