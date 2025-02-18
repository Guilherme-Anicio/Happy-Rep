import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tarefa } from "src/tarefa/tarefa.entity";

@Injectable()
export class TarefaService {
  constructor(
    @Inject("TAREFA_REPOSITORY")
    private readonly repository: Repository<Tarefa>,
  ) {}

  async getAll(): Promise<Tarefa[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Tarefa> {
    return this.repository.findOneBy({ id });
  }

  async create(tarefa: Tarefa): Promise<Tarefa> {
    return this.repository.save(tarefa);
  }

  async update(id: number, tarefa: Partial<Tarefa>): Promise<Tarefa> {
    const existingTarefa = await this.repository.findOneBy({ id });

    if (!existingTarefa) {
      throw new BadRequestException("Tarefa não encontrada.");
    }

    Object.assign(existingTarefa, tarefa);
    return this.repository.save(existingTarefa);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException("Tarefa não encontrada para exclusão.");
    }
  }
}
