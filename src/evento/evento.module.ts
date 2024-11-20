import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { DatabaseModule } from 'src/repositories/database.module';

@Module({
    imports : [DatabaseModule],
    controllers: [EventoController],
    providers: [EventoService],
    exports: [EventoService],
})
export class EventoModule {}
