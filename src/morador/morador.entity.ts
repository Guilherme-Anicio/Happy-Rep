import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tarefa } from "src/tarefa/tarefa.entity";
import { Evento } from "src/evento/evento.entity";
import { Transacao } from "src/transacao/transacao.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Length, Matches } from "class-validator";

@Entity("morador")
export class Morador {
  @PrimaryGeneratedColumn({ name: "morador_id" })
  id: number;

  @OneToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column({ nullable: false })
  @Length(3, 50)
  apelido: string;

  @Column({ type: "varchar", length: 15, default: "Calouro" })
  cargo: "Calouro" | "Veterano" | "Vice-Presidente" | "Presidente";

  @Column({ nullable: false })
  @Matches(/^\d{4}\/\d{1,2}$/, {
    message:
      "Período deve seguir o formato: 4 números, uma barra (/) e até 2 números (ex: 2024/1).",
  })
  periodo: string;

  @Column({ nullable: false })
  @Length(3, 100)
  curso: string;

  @Column({ type: "varchar", length: 8, nullable: false })
  turno_curso: "Integral" | "Noturno";

  @Column()
  @Length(3, 100)
  cidade_de_origem: string;

  @Column({ default: 0 })
  trotes: number;

  @ManyToMany(() => Tarefa, (tarefa) => tarefa.moradores_associados)
  tarefas: Tarefa[];

  @ManyToMany(() => Evento, (evento) => evento.participantes)
  eventos: Evento[];

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  saldo: number;

  @OneToMany(() => Transacao, (transacao) => transacao.morador)
  transacoes: Transacao[];

  /*@ManyToMany(() => Gasto, (gasto) => gasto.participantes)
  gastos: Gasto[];*/
}
