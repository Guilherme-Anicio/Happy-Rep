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
    return this.repository.save(morador);
  }

  async update(id: number, morador: Morador): Promise<Morador> {
    const existingMorador = await this.repository.findOneBy({ id });

    if (!existingMorador) {
      throw new BadRequestException('Morador não encontrado.');
    }

    Object.assign(existingMorador, morador);
    return this.repository.save(existingMorador);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Morador não encontrado para exclusão.');
    }
  }
}
