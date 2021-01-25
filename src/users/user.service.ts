import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createConnection, Connection, EntityManager, getManager, getConnectionManager } from "typeorm";

@Injectable()
export class UserService {

    /**
     * Traer todos los usuarios
     *
     * @returns String
     */
    async getAll() {
        const rawData = await getConnectionManager().get().query(`SELECT * FROM USERS`);
        return rawData;
    }

    /**
     * Crear usuario.
     *
     * @param {} userObject objeto con los valores del objeto principal.
     * @returns Object
     */
    async saveUser(userData) {
        const testCreated = await getConnectionManager().get().query(`SELECT * FROM USERS where email='${userData.email}' or identificationnumber='${userData.identificationnumber}'`);

        if (testCreated.length == 0) {


            const insert = await getConnectionManager().get().query(
                `INSERT INTO users values ('${userData.names}', '${userData.surname}', '${userData.lastname}', '${userData.phone}', ${userData.bankaccounttype}, '${userData.accountnumber}', ${userData.identificationnumber}, DEFAULT, ${userData.identificationtype}, '${userData.email}')`
            );

            return insert
        }
        else {
            throw new InternalServerErrorException(
                'El usuario ya existe. Recuerda no repetir ni documento de identificación ni email.',
            );
        }

    }


    /**
     * Editar usuario.
     *
     * @param {} userObject objeto con los valores del objeto principal. El ID esta contenido en el objeto
     * @returns Object
     */
    async editUser(userData) {
        const testCreated = await getConnectionManager().get().query(`SELECT * FROM USERS where id<>${userData.id} and (email='${userData.email}' or identificationnumber='${userData.identificationnumber}')`);

        if (testCreated.length == 0) {

            const update = await getConnectionManager().get().query(
                `UPDATE users SET 
                name ='${userData.names}', 
                surname = '${userData.surname}', 
                lastname = '${userData.lastname}', 
                phone = '${userData.phone}', 
                bankaccounttype = ${userData.bankaccounttype}, 
                accountnumber = '${userData.accountnumber}', 
                identificationnumber = ${userData.identificationnumber}, 
                identificationtype = ${userData.identificationtype}, 
                email = '${userData.email}'
                where id = ${userData.id}
                `
            );

            return update
        }
        else {
            throw new InternalServerErrorException(
                'El usuario ya existe. Recuerda no repetir ni documento de identificación ni email.',
            );
        }

    }


    /**
     * Eliminar usuario.
     *
     * @param {} idId del usuario a borrar
     * @returns Object
     */
     async deleteUser(id) {
        const testCreated = await getConnectionManager().get().query(`DELETE FROM users where id = ${id}`);
        return testCreated;
    }


}
