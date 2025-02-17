import { DataSource } from "typeorm";
import { Morador } from "../morador/morador.entity";
import { Tarefa } from "../tarefa/tarefa.entity";
import { Evento } from "../evento/evento.entity";
import { Transacao } from "src/transacao/transacao.entity";
import { Usuario } from "src/usuario/usuario.entity";

export const repositoryProvider = [
  {
    provide: "MORADOR_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Morador),
    inject: ["SQLITE_DATA_SOURCE"],
  },
  {
    provide: "TAREFA_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefa),
    inject: ["SQLITE_DATA_SOURCE"],
  },
  {
    provide: "EVENTO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Evento),
    inject: ["SQLITE_DATA_SOURCE"],
  },
  {
    provide: "TRANSACAO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transacao),
    inject: ["SQLITE_DATA_SOURCE"],
  },
  {
    provide: "USUARIO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: ["SQLITE_DATA_SOURCE"],
  },
];
