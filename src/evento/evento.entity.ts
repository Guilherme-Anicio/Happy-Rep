import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Morador } from 'src/morador/morador.entity';

@Entity('evento')
export class Evento {
  @PrimaryGeneratedColumn({ name: "evento_id" })
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @Column()
  valor: string;

  @ManyToMany(() => Morador, (morador) => morador.eventos)
  @JoinTable()
  participantes: Morador[];
}