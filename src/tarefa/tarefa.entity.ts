import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Morador } from "src/morador/morador.entity";
import { Length } from "class-validator";

@Entity("tarefa")
export class Tarefa {
  @PrimaryGeneratedColumn({ name: "tarefa_id" })
  id: number;

  @Column({ nullable: false })
  @Length(3, 100)
  nome: string;

  @Column()
  @Length(3, 100)
  descricao: string;

  @Column({ name: "data-inicio", type: "date" })
  dataInicio: Date;

  @Column({ name: "data-fim", type: "date" })
  dataFim: Date;

  @Column({ default: false, nullable: false })
  concluida: boolean;

  @ManyToMany(() => Morador, (morador) => morador.tarefas)
  @JoinTable()
  moradores_associados: Morador[];
}
