import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouse.controller';
import { WarehousesService } from './warehouse.service';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService]
})
export class WarehouseModule {}
