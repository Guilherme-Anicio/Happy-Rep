import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Evento } from 'src/evento/evento.entity';
import { validateEntity } from 'src/utils/validation.util';

@Injectable()
export class EventoService {
  constructor(
    @Inject('EVENTO_REPOSITORY')
    private readonly repository: Repository<Evento>,
  ) {}

  async getAll(): Promise<Evento[]> {
    return this.repository.find({ relations: ['participantes'] });
  }

  async get(id: number): Promise<Evento> {
    return this.repository.findOne({ where: { id }, relations: ['participantes'] });
  }

  async create(evento: Evento): Promise<Evento> {
    this.validateEvento(evento);
    return this.repository.save(evento);
  }

  async update(id: number, evento: Evento): Promise<Evento> {
    const existingEvento = await this.repository.findOneBy({ id });

    if (!existingEvento) {
      throw new BadRequestException('Evento não encontrado.');
    }

    this.validateEvento(evento);
    Object.assign(existingEvento, evento);
    return this.repository.save(existingEvento);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Evento não encontrado para exclusão.');
    }
  }

  private validateEvento(evento: Evento): void {
    const eventoValidators: Record<string, (value: any) => void> = {
      nome: this.validateNome.bind(this),
      descricao: this.validateDescricao.bind(this),
    };
  
    validateEntity(evento, eventoValidators);
  }
  

  private validateNome(nome: string): void {
    if (nome.length < 3 || nome.length > 100) {
      throw new BadRequestException('Nome deve ter entre 3 e 100 caracteres.');
    }
  }

  private validateDescricao(descricao: string): void {
    if (descricao.length < 3 || descricao.length > 100) {
      throw new BadRequestException('Descrição deve ter entre 3 e 100 caracteres.');
    }
  }
  
}