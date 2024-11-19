import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Morador } from 'src/morador/morador.entity';

@Entity('tarefa')
export class Tarefa {
  @PrimaryGeneratedColumn({ name: "tarefa_id" })
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ name: 'data-inicio', type: 'date' })
  dataInicio: Date;

  @Column({ name: 'data-fim', type: 'date' }) 
  dataFim: Date;

  @Column({ default: false })
  concluida: boolean;

  @ManyToMany(() => Morador, (morador) => morador.tarefas)
  @JoinTable() 
  moradores_associados: Morador[];
}
