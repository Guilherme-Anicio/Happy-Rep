import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
