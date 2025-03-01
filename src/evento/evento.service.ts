import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Evento } from "src/evento/evento.entity";

@Injectable()
export class EventoService {
  constructor(
    @Inject("EVENTO_REPOSITORY")
    private readonly repository: Repository<Evento>,
  ) {}

  async getAll(): Promise<Evento[]> {
    return this.repository.find({ relations: ["participantes"] });
  }

  async get(id: number): Promise<Evento> {
    return this.repository.findOne({
      where: { id },
      relations: ["participantes"],
    });
  }

  async create(evento: Evento): Promise<Evento> {
    return this.repository.save(evento);
  }

  async update(id: number, evento: Partial<Evento>): Promise<Evento> {
    const existingEvento = await this.repository.findOneBy({ id });

    if (!existingEvento) {
      throw new BadRequestException("Evento não encontrado.");
    }

    Object.assign(existingEvento, evento);
    return this.repository.save(existingEvento);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException("Evento não encontrado para exclusão.");
    }
  }
}
