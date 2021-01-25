import { WarehousesService } from './warehouse.service';
import { Body, Controller, Get, Post, Res, HttpStatus, Delete, Param, } from '@nestjs/common';
import { Response } from 'express';

@Controller('warehouses')
export class WarehousesController {

    constructor(private readonly warehousesService: WarehousesService) { }

    @Get()
    async findAll() {
        let result = await this.warehousesService.getAll();
        return result;
    }

    @Post('')
    public async saveUser(
        @Body() userData,
        @Res() res: Response,
    ) {

        try {
            let result = await this.warehousesService.create(userData);
            res.status(HttpStatus.CREATED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }


    @Post('edit')
    public async edit(
        @Body() wareData,
        @Res() res: Response,
    ) {

        try {
            let result = await this.warehousesService.edit(wareData);
            res.status(HttpStatus.ACCEPTED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }

    @Delete(':id')
    public async delete(
        @Res() res: Response,
        @Param() params
    ) {

        try {
            let result = await this.warehousesService.delete(params.id);
            res.status(HttpStatus.ACCEPTED).send(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    }

}
