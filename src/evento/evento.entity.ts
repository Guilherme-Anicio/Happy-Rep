import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Morador } from "src/morador/morador.entity";
import { Length } from "class-validator";

@Entity("evento")
export class Evento {
  @PrimaryGeneratedColumn({ name: "evento_id" })
  id: number;

  @Column({ nullable: false })
  @Length(3, 100)
  nome: string;

  @Column()
  @Length(3, 100)
  descricao: string;

  @Column({ name: "data", type: "date", nullable: false })
  data: Date;

  @Column({ name: "hora", type: "time" })
  hora: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor: number;

  @ManyToMany(() => Morador, (morador) => morador.eventos)
  @JoinTable()
  participantes: Morador[];
}
