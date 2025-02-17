import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Morador } from "src/morador/morador.entity";

@Entity("transacao")
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 10, nullable: false }) // Substitui o enum por varchar
  tipo: "Deposito" | "Saque"; // Ainda mantemos a tipagem no TypeScript

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  valor: number;

  @Column({ type: "date", nullable: false })
  data: Date;

  @ManyToOne(() => Morador, (morador) => morador.transacoes, {
    nullable: false,
  })
  morador: Morador;
}
