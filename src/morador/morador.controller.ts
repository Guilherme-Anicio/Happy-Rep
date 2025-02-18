import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MoradorService } from "./morador.service";
import { Morador } from "./morador.entity";

@Controller("/morador")
export class MoradorController {
  constructor(private readonly moradorService: MoradorService) {}

  @Get()
  getMoradores(): Promise<Morador[]> {
    return this.moradorService.getAll();
  }

  @Get(":id")
  getMorador(@Param("id") id: string): Promise<Morador> {
    return this.moradorService.get(Number(id));
  }

  @Post()
  createMorador(@Body() morador: Morador): Promise<Morador> {
    return this.moradorService.create(morador);
  }

  @Put(":id")
  updateMorador(
    @Param("id") id: string,
    @Body() morador: Morador,
  ): Promise<Morador> {
    return this.moradorService.update(Number(id), morador);
  }

  @Delete(":id")
  deleteMorador(@Param("id") id: string): Promise<void> {
    return this.moradorService.delete(Number(id));
  }
}
