import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarefa } from 'src/tarefa/tarefa.entity';
import { Evento } from 'src/evento/evento.entity';
import { Transacao } from 'src/transacao/transacao.entity';

@Entity('morador')
export class Morador {
  @PrimaryGeneratedColumn({ name: "morador_id" })
  id: number;

  @Column()
  nome: string;

  @Column()
  apelido: string;

  @Column()
  periodo: string;

  @Column()
  curso: string;

  @Column({ type: 'enum', enum: ['Integral', 'Noturno'] })
  turno_curso: 'Integral' | 'Noturno';

  @Column()
  cidade_de_origem: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @ManyToMany(() => Tarefa, (tarefa) => tarefa.moradores_associados)
  tarefas: Tarefa[];

  @ManyToMany(() => Evento, (evento) => evento.participantes)
  eventos: Evento[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldo: number;

  @OneToMany(() => Transacao, (transacao) => transacao.morador)
  transacoes: Transacao[];

  /*@ManyToMany(() => Gasto, (gasto) => gasto.participantes)
  gastos: Gasto[];*/
}
