import { IsEmail, Length, Matches } from "class-validator";
import { Morador } from "src/morador/morador.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn({ name: "usuario_id" })
  id: number;

  @Column({ nullable: false })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "O nome deve conter apenas letras e espaços.",
  })
  nome: string;

  @Column({ nullable: false })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "O sobrenome deve conter apenas letras e espaços.",
  })
  sobrenome: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Length(8, 30)
  senha: string;

  @Column({ nullable: false, unique: true })
  @Matches(/^\d{10,11}$/, {
    message:
      "Telefone deve conter entre 10 e 11 dígitos numéricos (ex: 11987654321).",
  })
  telefone: string;

  @OneToOne(() => Morador, (morador) => morador.usuario) // Relacionamento 1:1 com Morador
  morador: Morador;
}
