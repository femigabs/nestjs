import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpCode,
    UseFilters,
    Get,
    Param,
    Delete,
    Put
} from '@nestjs/common';
import { UserService } from '../services';
import { JoiValidationPipe, ResponseService } from '../common';
import { createUserSchema } from '../validations';
import { CreateUserDto } from '../dtos';

@Controller('api')
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly responseService: ResponseService,
    ) { }

    @Post('/users')
    @HttpCode(201)
    async createUser(
        @Body(new JoiValidationPipe(createUserSchema)) payload: CreateUserDto
    ) {
        try {
            const user = await this.usersService.createUser(payload);

            return this.responseService.generateSuccessResponse(
                user,
                'User created successfully',
                201,
            );
        } catch (error) {
            const message = error.message || 'Error creating user';

            throw new HttpException(message, error?.code || 400);
        }
    }

    @Get('/user/:userId')
    async getUserById(
        @Param('userId') userId: string
    ) {
        try {
            const user = await this.usersService.getUserById(userId);

            return this.responseService.generateSuccessResponse(
                user,
                'User fetched successfully',
                200,
            );
        } catch (error) {
            const message = error.message || 'Error fetching user';

            throw new HttpException(message, error?.code || 400);
        }
    };

    @Get('/user/:userId/avatar')
    async getUserAvatar(@Param('userId') userId: string) {
        try {
            const user = await this.usersService.getUserAvatar(userId);

            return this.responseService.generateSuccessResponse(
                user,
                'User avatar fetched successfully',
                200,
            );
        } catch (error) {
            const message = error.message || 'Error fetching user';

            throw new HttpException(message, error?.code || 400);
        };
    };

    @Delete('user/:userId/avatar')
    async deleteUserAvatar(@Param('userId') userId: string) {
        try {
            const user = await this.usersService.deleteUserAvatar(userId);

            return this.responseService.generateSuccessResponse(
                user,
                'User avatar deleted successfully',
                200,
            );
        } catch (error) {
            const message = error.message || 'Error fetching user';

            throw new HttpException(message, error?.code || 400);
        };
    };
}
