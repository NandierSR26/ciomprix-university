import { LoginDTO } from "../dtos/login.dto";
import { UserEntity } from "../entities/user.entity";
import { LoginRepository } from "../repositories/login.repository";

export interface LoginResponse {
  user: UserEntity;
  token: any
}

export class LoginUseCase {

  constructor(
    private readonly repository: LoginRepository
  ) {}

  execute( dto: LoginDTO ): Promise<LoginResponse> {
    return this.repository.login( dto );
  }

}