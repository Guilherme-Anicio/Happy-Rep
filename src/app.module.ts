import { Module } from '@nestjs/common';
import { MoradorModule } from './morador/morador.module';

@Module({
  imports: [MoradorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
