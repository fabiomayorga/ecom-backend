import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createConnection, Connection, EntityManager, getManager, getConnectionManager } from "typeorm";

@Injectable()
export class WarehousesService {

    /**
     * Crea la entidad principal de la prueba.
     *
     * @param {} measurerCreateDto objeto con los valores del objeto principal.
     * @returns String
     */
    async getAll() {
        const rawData = await getConnectionManager().get().query(`select *, users.name as ownernames from users inner join warehouses w ON users .id  = w.userid`);
        return rawData;
    }



    /**
     * Crear almacen.
     *
     * @param {} wareObject objeto con los valores del objeto principal.
     * @returns Object
     */
     async create(w) {
        const testCreated = await getConnectionManager().get().query(`SELECT * FROM warehouses where nit='${w.nit}'`);

        if (testCreated.length == 0) {

            console.log( `INSERT INTO warehouses values (${w.userid}, '${w.maxvolume}', '${w.productid}', '${w.address}', '${w.phone}', '${w.bankaccountnumber}', '${w.name}' , '${w.nit}')`)
            const insert = await getConnectionManager().get().query(
                `INSERT INTO warehouses values (${w.userid}, '${w.maxvolume}', '${w.productid}', '${w.address}', '${w.phone}', '${w.bankaccountnumber}', '${w.name}' , '${w.nit}')`
            );

            return insert
        }
        else {
            throw new InternalServerErrorException(
                'Ya existe un almacen con este NIT  .',
            );
        }

    }


      /**
     * Editar almacen.
     *
     * @param {} warehouseObject objeto con los valores del objeto principal. El ID esta contenido en el objeto
     * @returns Object
     */
     async edit(wareData) {
        const testCreated = await getConnectionManager().get().query(`SELECT * FROM warehouses where id<>${wareData.id} and  nit='${wareData.nit}'`);
        console.log(`SELECT * FROM warehouses where id<>${wareData.id} and  nit='${wareData.nit}'`)
        if (testCreated.length == 0) {

            const update = await getConnectionManager().get().query(
                `UPDATE warehouses SET 
                name ='${wareData.name}', 
                phone = '${wareData.phone}', 
                address = '${wareData.address}', 
                bankaccountnumber = '${wareData.bankaccountnumber}', 
                maxvolume = ${wareData.maxvolume}, 
                userid = ${wareData.userid}, 
                nit = '${wareData.nit}'
                where id = ${wareData.id}`
            );


            return update
        }
        else {
            throw new InternalServerErrorException(
                'Ya existe un almacen con el nit '+wareData.nit+'.',
            );
        }

    }


    /**
     * Eliminar almacen.
     *
     * @param {} idId del almacen a borrar
     * @returns Object
     */
     async delete(id) {
        const testCreated = await getConnectionManager().get().query(`DELETE FROM warehouses where id = ${id}`);
        return testCreated;
    }


}
