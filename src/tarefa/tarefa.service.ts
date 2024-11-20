import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tarefa } from 'src/tarefa/tarefa.entity';
import { validateEntity } from 'src/utils/validation.util';

@Injectable()
export class TarefaService {
  constructor(
    @Inject('TAREFA_REPOSITORY')
    private readonly repository: Repository<Tarefa>,
  ) {}

  async getAll(): Promise<Tarefa[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Tarefa> {
    return this.repository.findOneBy({ id });
  }

  async create(tarefa: Tarefa): Promise<Tarefa> {
    this.validateTarefa(tarefa);
    return this.repository.save(tarefa);
  }

  async update(id: number, tarefa: Tarefa): Promise<Tarefa> {
    const existingTarefa = await this.repository.findOneBy({ id });

    if (!existingTarefa) {
      throw new BadRequestException('Tarefa não encontrada.');
    }

    this.validateTarefa(tarefa);
    Object.assign(existingTarefa, tarefa);
    return this.repository.save(existingTarefa);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Tarefa não encontrada para exclusão.');
    }
  }

  private validateTarefa(tarefa: Tarefa): void {
    const tarefaValidators: Record<string, (value: any) => void> = {
      nome: this.validateNome.bind(this),
      descricao: this.validateDescricao.bind(this),
    };
  
    validateEntity(tarefa, tarefaValidators);
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
