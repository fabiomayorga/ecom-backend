import { Controller, Get } from '@nestjs/common';
import { WarehousesService } from './warehouse.service';

@Controller('warehouses')
export class WarehousesController {

    constructor(private readonly warehousesService: WarehousesService) { }

    @Get()
    async findAllMain() {
        let result = await this.warehousesService.create();
        return result;
    }
}
