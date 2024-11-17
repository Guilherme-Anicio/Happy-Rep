import { DataSource } from "typeorm";
import { Morador } from "../morador/morador.entity";

export const repositoryProvider = [
    {
        provide: 'MORADOR_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Morador),
        inject: ['MYSQL_DATA_SOURCE'],
      },
];