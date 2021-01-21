import { Module } from '@nestjs/common';
import { WarehouseModule } from './warehouses/warehouse.module';
import {UserModule} from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    WarehouseModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
