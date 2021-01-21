import { Body, Controller, Get, Post, Res, HttpStatus, } from '@nestjs/common';
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

        try{
             let result = await this.userService.saveUser(userData);
        res.status(HttpStatus.CREATED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
       
    }
}
