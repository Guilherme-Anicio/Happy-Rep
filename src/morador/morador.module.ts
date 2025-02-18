import { Module } from "@nestjs/common";
import { MoradorController } from "./morador.controller";
import { MoradorService } from "./morador.service";
import { DatabaseModule } from "src/repositories/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [MoradorController],
  providers: [MoradorService],
  exports: [MoradorService],
})
export class MoradorModule {}
