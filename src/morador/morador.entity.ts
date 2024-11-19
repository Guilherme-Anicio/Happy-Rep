import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarefa } from 'src/tarefa/tarefa.entity';
import { Evento } from 'src/evento/evento.entity';

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

  @Column()
  turno_curso: string;

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
}
