import { Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { Transacao } from './transacao.entity';

@Controller('/transacao')
export class TransacaoController {
    constructor(private readonly transacaoService: TransacaoService) {}

    @Get()
    getTransacoes(): Promise<Transacao[]> {
        return this.transacaoService.getAll();
    }

    @Get(':id')
    getTransacao(@Param('id') id: string): Promise<Transacao> {
        return this.transacaoService.get(Number(id));
    }

    @Post()
    createTransacao(@Body() transacao: Transacao): Promise<Transacao> {
        return this.transacaoService.create(transacao);
    }

    @Put(':id')
    updateTransacao(@Param('id') id: string, @Body() transacao: Transacao): Promise<Transacao> {
        return this.transacaoService.update(Number(id), transacao);
    }

    @Delete(':id')
    deleteTransacao(@Param('id') id: string): Promise<void> {
        return this.transacaoService.delete(Number(id));
    }
}

