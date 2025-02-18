import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { EventoService } from "./evento.service";
import { Evento } from "./evento.entity";

@Controller("/evento")
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  getEventos(): Promise<Evento[]> {
    return this.eventoService.getAll();
  }

  @Get(":id")
  getEvento(@Param("id") id: string): Promise<Evento> {
    return this.eventoService.get(Number(id));
  }

  @Post()
  createEvento(@Body() evento: Evento): Promise<Evento> {
    return this.eventoService.create(evento);
  }

  @Put(":id")
  updateEvento(
    @Param("id") id: string,
    @Body() evento: Partial<Evento>,
  ): Promise<Evento> {
    return this.eventoService.update(Number(id), evento);
  }

  @Delete(":id")
  deleteEvento(@Param("id") id: string): Promise<void> {
    return this.eventoService.delete(Number(id));
  }
}
