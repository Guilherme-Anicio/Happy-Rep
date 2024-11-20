import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transacao } from './transacao.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @Inject('TRANSACAO_REPOSITORY')
    private readonly repository: Repository<Transacao>,
  ) {}

  async getAll(): Promise<Transacao[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Transacao> {
    return this.repository.findOneBy({ id });
  }

  async create(transacao: Transacao): Promise<Transacao> {
    return this.repository.save(transacao);
  }

  async update(id: number, transacao: Transacao): Promise<Transacao> {
    const existingTransacao = await this.repository.findOneBy({ id });

    if (!existingTransacao) {
      throw new BadRequestException('Transação não encontrado.');
    }

    Object.assign(existingTransacao, transacao);
    return this.repository.save(existingTransacao);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Transação não encontrado para exclusão.');
    }
  }
}
