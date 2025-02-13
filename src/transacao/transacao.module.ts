import { Module } from '@nestjs/common';
import { TransacaoController } from './transacao.controller';
import { TransacaoService } from './transacao.service';
import { DatabaseModule } from 'src/repositories/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
