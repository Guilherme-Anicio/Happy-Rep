import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { Tarefa } from "src/tarefa/tarefa.entity";
import { Morador } from "src/morador/morador.entity";

@Injectable()
export class TarefaService {
  constructor(
    @Inject("TAREFA_REPOSITORY")
    private readonly repository: Repository<Tarefa>,
    @Inject("MORADOR_REPOSITORY")
    private readonly moradorRepository: Repository<Morador>,
  ) {}

  async getAll(): Promise<Tarefa[]> {
    return this.repository.find({ relations: ["moradores_associados"] });
  }

  async get(id: number): Promise<Tarefa> {
    return this.repository.findOne({
      where: { id },
      relations: ["moradores_associados"],
    });
  }

  async create(tarefaPartial: Partial<Tarefa>): Promise<Tarefa> {
    const { moradores_associados, ...dadosTarefa } = tarefaPartial;

    if (!Array.isArray(moradores_associados)) {
      throw new BadRequestException(
        "moradores_associados must be an array of IDs.",
      );
    }

    const moradores = await this.moradorRepository.findBy({
      id: In(moradores_associados),
    });

    const tarefa = this.repository.create({
      ...dadosTarefa,
      moradores_associados: moradores,
    });

    return this.repository.save(tarefa);
  }

  async update(id: number, tarefaDto: Partial<Tarefa>): Promise<Tarefa> {
    const existingTarefa = await this.repository.findOne({
      where: { id },
      relations: ["moradores_associados"],
    });

    if (!existingTarefa) {
      throw new BadRequestException("Tarefa não encontrada.");
    }

    const { moradores_associados, ...dadosTarefa } = tarefaDto;

    if (moradores_associados) {
      const moradores = await this.moradorRepository.findBy({
        id: In(moradores_associados),
      });
      existingTarefa.moradores_associados = moradores;
    }

    Object.assign(existingTarefa, dadosTarefa);
    return this.repository.save(existingTarefa);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException("Tarefa não encontrada para exclusão.");
    }
  }
}
