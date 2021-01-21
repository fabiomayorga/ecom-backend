import { Injectable } from '@nestjs/common';
import { createConnection, Connection, EntityManager, getManager, getConnectionManager } from "typeorm";

@Injectable()
export class WarehousesService {

    /**
     * Crea la entidad principal de la prueba.
     *
     * @param {} measurerCreateDto objeto con los valores del objeto principal.
     * @returns String
     */
    async create() {
        const rawData = await getConnectionManager().get().query(`SELECT * FROM warehouses`);
        return rawData;
    }

}
