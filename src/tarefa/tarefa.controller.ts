import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TarefaService } from "./tarefa.service";
import { Tarefa } from "./tarefa.entity";

@Controller("/tarefa")
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Get()
  getTarefas(): Promise<Tarefa[]> {
    return this.tarefaService.getAll();
  }

  @Get(":id")
  getTarefa(@Param("id") id: string): Promise<Tarefa> {
    return this.tarefaService.get(Number(id));
  }

  @Post()
  createTarefa(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.tarefaService.create(tarefa);
  }

  @Put(":id")
  updateTarefa(
    @Param("id") id: string,
    @Body() tarefa: Tarefa,
  ): Promise<Tarefa> {
    return this.tarefaService.update(Number(id), tarefa);
  }

  @Delete(":id")
  deleteTarefa(@Param("id") id: string): Promise<void> {
    return this.tarefaService.delete(Number(id));
  }
}
