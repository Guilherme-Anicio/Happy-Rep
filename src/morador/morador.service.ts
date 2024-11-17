import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Morador } from 'src/morador/morador.entity';

@Injectable()
export class MoradorService {
  constructor(
    @Inject('MORADOR_REPOSITORY')
    private readonly repository: Repository<Morador>,
  ) {}

  async getAll(): Promise<Morador[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Morador> {
    return this.repository.findOneBy({ id });
  }

  async create(morador: Morador): Promise<Morador> {
    this.validateAndFormatMorador(morador);
    return this.repository.save(morador);
  }

  async update(id: number, morador: Morador): Promise<Morador> {
    const existingMorador = await this.repository.findOneBy({ id });

    if (!existingMorador) {
      throw new BadRequestException('Morador não encontrado.');
    }

    this.validateAndFormatMorador(morador)

    existingMorador.nome = morador.nome;
    existingMorador.apelido = morador.apelido;
    existingMorador.periodo = morador.periodo;
    existingMorador.curso = morador.curso;
    existingMorador.turno_curso = morador.turno_curso;
    existingMorador.cidade_de_origem = morador.cidade_de_origem;
    existingMorador.email = morador.email;
    existingMorador.telefone = morador.telefone;

    return this.repository.save(existingMorador);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Morador não encontrado para exclusão.');
    }
  }

  private validateAndFormatMorador(morador: Morador): void {
    this.validateNome(morador.nome);
    this.validateApelido(morador.apelido);
    this.validatePeriodo(morador.periodo);
    this.validateCurso(morador.curso);
    this.validateCidadeDeOrigem(morador.cidade_de_origem);
    this.validateEmail(morador.email);

    if (morador.turno_curso) {
      this.formatTurnoCurso(morador);
    }

    if (morador.telefone) {
      this.validateAndFormatTelefone(morador);
    }
  }

  private validateAndFormatTelefone(morador: Morador): void {
    const regex = /^\d{11}$/;
    if (!regex.test(morador.telefone)) {
      throw new BadRequestException('Telefone deve conter exatamente 11 dígitos numéricos.');
    }

    if (morador.telefone.charAt(2) !== '9') {
      throw new BadRequestException('O terceiro dígito do telefone deve ser "9".');
    }

    morador.telefone = `(${morador.telefone.slice(0, 2)}) ${morador.telefone.slice(2, 7)}-${morador.telefone.slice(7)}`;
  }

  private formatTurnoCurso(morador: Morador): void {
    const validOptions = ['Integral', 'Noturno'];
    const formattedTurno = morador.turno_curso.charAt(0).toUpperCase() + morador.turno_curso.slice(1).toLowerCase();

    if (!validOptions.includes(formattedTurno)) {
      throw new BadRequestException('Turno do curso deve ser "Integral" ou "Noturno".');
    }

    morador.turno_curso = formattedTurno;
  }

  private validateNome(nome: string): void {
    if (nome.length < 3 || nome.length > 100) {
      throw new BadRequestException('Nome deve ter entre 3 e 100 caracteres.');
    }
  }

  private validateApelido(apelido: string): void {
    if (apelido.length < 3 || apelido.length > 50) {
      throw new BadRequestException('Apelido deve ter entre 3 e 50 caracteres.');
    }
  }

  private validatePeriodo(periodo: string): void {
    const regex = /^\d{4}\/\d{1,2}$/;
    if (!regex.test(periodo)) {
      throw new BadRequestException('Período deve seguir o formato: 4 números, uma barra (/) e até 2 números (ex: 2024/1).');
    }
  }

  private validateCurso(curso: string): void {
    if (curso.length < 3 || curso.length > 100) {
      throw new BadRequestException('Curso deve ter entre 3 e 100 caracteres.');
    }
  }

  private validateCidadeDeOrigem(cidade: string): void {
    if (cidade.length < 3 || cidade.length > 100) {
      throw new BadRequestException('Cidade de origem deve ter entre 3 e 100 caracteres.');
    }
  }

  private validateEmail(email: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new BadRequestException('Formato de email inválido. Por favor, insira um email válido.');
    }
  }
}
