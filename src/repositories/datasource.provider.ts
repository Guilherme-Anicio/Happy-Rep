import { DataSource } from "typeorm";

export const datasourceProvider = [
  {
    provide: "SQLITE_DATA_SOURCE",
    useFactory: async (): Promise<DataSource> => {
      const datasource: DataSource = new DataSource({
        type: "sqlite", // Tipo do banco de dados (SQLite)
        database: "database.sqlite", // Nome do arquivo do banco de dados
        entities: [__dirname + "/../**/*.entity{.ts,.js}"], // Caminho para as entidades
        synchronize: true, // Sincroniza o esquema do banco de dados automaticamente
      });
      return datasource.initialize(); // Inicializa a conexão com o banco de dados
    },
  },
];
