import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Morador } from 'src/morador/morador.entity';
import { validateEntity } from 'src/utils/validation.util';

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

    Object.assign(existingMorador, morador);
    return this.repository.save(existingMorador);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Morador não encontrado para exclusão.');
    }
  }

  private validateAndFormatMorador(morador: Morador): void {
    const moradorValidators: Record<string, (value: any) => void> = {
      nome: this.validateNome.bind(this),
      apelido: this.validateApelido.bind(this),
      periodo: this.validatePeriodo.bind(this),
      curso: this.validateCurso.bind(this),
      cidade_de_origem: this.validateCidadeDeOrigem.bind(this),
      email: this.validateEmail.bind(this),
      telefone: this.validateAndFormatTelefone.bind(this),
    };
  
    validateEntity(morador, moradorValidators);
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
