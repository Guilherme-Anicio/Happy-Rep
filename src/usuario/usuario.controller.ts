import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";

@Controller("/usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("/login")
  async login(@Body() { email, senha }: { email: string; senha: string }) {
    return this.usuarioService.authenticate(email, senha);
  }

  @Get()
  getUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.getAll();
  }

  @Get(":id")
  getUsuario(@Param("id") id: string): Promise<Usuario> {
    return this.usuarioService.get(Number(id));
  }

  @Post()
  createUsuario(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put(":id")
  updateUsuario(
    @Param("id") id: string,
    @Body() usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuarioService.update(Number(id), usuario);
  }

  @Delete(":id")
  deleteUsuario(@Param("id") id: string): Promise<void> {
    return this.usuarioService.delete(Number(id));
  }
}
