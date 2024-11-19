import { DataSource } from 'typeorm';
import { Morador } from '../morador/morador.entity';
import { Tarefa } from '../tarefa/tarefa.entity';
import { Evento } from '../evento/evento.entity';

export const repositoryProvider = [
  {
    provide: 'MORADOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Morador),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TAREFA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefa),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'EVENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Evento),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];