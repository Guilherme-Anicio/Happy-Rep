import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { DatabaseModule } from "src/repositories/database.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: "segredo", //Normalmente isso é uma variável de ambiente, mas, para facilitar a vida do professor, deixei aqui mesmo
      signOptions: { expiresIn: "2h" },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
