import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Morador } from 'src/morador/morador.entity';

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Deposito', 'Saque'] })
  tipo: 'Deposito' | 'Saque';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  data: Date;

  @ManyToOne(() => Morador, (morador) => morador.transacoes)
  morador: Morador;
}
