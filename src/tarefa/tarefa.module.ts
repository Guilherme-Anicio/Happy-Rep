import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';
import { DatabaseModule } from 'src/repositories/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TarefaService],
})
export class TarefaModule {}
