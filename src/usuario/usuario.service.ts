import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';
import { validateEntity } from 'src/utils/validation.util';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly repository: Repository<Usuario>,
  ) {}

  async getAll(): Promise<Usuario[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Usuario> {
    return this.repository.findOneBy({ id });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    this.validateAndFormatUsuario(usuario);
    return this.repository.save(usuario);
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    const existingUsuario = await this.repository.findOneBy({ id });

    if (!existingUsuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    this.validateAndFormatUsuario(usuario);

    Object.assign(existingUsuario, usuario);
    return this.repository.save(existingUsuario);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException('Usuário não encontrado para exclusão.');
    }
  }

  private validateAndFormatUsuario(usuario: Usuario): void {
    const moradorValidators: Record<string, (value: any) => void> = {
      telefone: this.validateTelefone.bind(this),
    };

    validateEntity(usuario, moradorValidators);
  }

  private validateTelefone(telefone: string): void {
    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      throw new BadRequestException(
        'Telefone deve conter entre 10 e 11 dígitos numéricos (ex: 11987654321).',
      );
    }
  }
}
