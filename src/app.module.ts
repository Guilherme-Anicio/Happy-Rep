import { Module } from '@nestjs/common';
import { MoradorModule } from './morador/morador.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { EventoModule } from './evento/evento.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [MoradorModule, TarefaModule, EventoModule, TransacaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
