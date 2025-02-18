import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Usuario } from "src/usuario/usuario.entity";
import { validateEntity } from "src/utils/validation.util";

@Injectable()
export class UsuarioService {
  constructor(
    @Inject("USUARIO_REPOSITORY")
    private readonly repository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.repository.findOne({
      where: { email },
      relations: ["morador"],
    });
  }

  async authenticate(
    email: string,
    senha: string,
  ): Promise<{ token: string; user: Partial<Usuario> }> {
    const usuario = await this.findByEmail(email);

    if (!usuario) {
      throw new BadRequestException("Email inválido.");
    } else if (usuario.senha !== senha) {
      throw new BadRequestException("Senha inválida.");
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...usuarioSemSenha } = usuario;

    return { token: token, user: usuarioSemSenha };
  }

  async getAll(): Promise<Usuario[]> {
    return this.repository.find({ relations: ["morador"] });
  }

  async get(id: number): Promise<Usuario> {
    return this.repository.findOne({ where: { id }, relations: ["morador"] });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    this.validateAndFormatUsuario(usuario);
    return this.repository.save(usuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    const existingUsuario = await this.repository.findOneBy({ id });

    if (!existingUsuario) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    this.validateAndFormatUsuario(usuario);

    Object.assign(existingUsuario, usuario);
    return this.repository.save(existingUsuario);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (!deleteResult.affected) {
      throw new BadRequestException("Usuário não encontrado para exclusão.");
    }
  }

  private validateAndFormatUsuario(usuario: Partial<Usuario>): void {
    const moradorValidators: Record<string, (value: any) => void> = {
      telefone: this.validateTelefone.bind(this),
    };

    validateEntity(usuario, moradorValidators);
  }

  private validateTelefone(telefone: string): void {
    telefone = telefone.replace(/\D/g, "");

    if (telefone.length < 10 || telefone.length > 11) {
      throw new BadRequestException(
        "Telefone deve conter entre 10 e 11 dígitos numéricos (ex: 11987654321).",
      );
    }
  }
}
