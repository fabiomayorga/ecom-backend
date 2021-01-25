import { Body, Controller, Get, Post, Res, HttpStatus, Delete, Param, } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('')
    public async findAllMain() {
        let result = await this.userService.getAll();
        return result;
    }

    @Post('')
    public async saveUser(
        @Body() userData,
        @Res() res: Response,
    ) {

        try {
            let result = await this.userService.saveUser(userData);
            res.status(HttpStatus.CREATED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }

    @Post('edit')
    public async editUser(
        @Body() userData,
        @Res() res: Response,
    ) {

        try {
            let result = await this.userService.editUser(userData);
            res.status(HttpStatus.ACCEPTED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }

    @Delete(':id')
    public async deleteUser(
        @Res() res: Response,
        @Param() params
    ) {

        try {
            let result = await this.userService.deleteUser(params.id);
            res.status(HttpStatus.ACCEPTED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }
}
