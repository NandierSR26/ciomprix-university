import { LoginDataSource } from "../../../domain/auth/dataSources/login.datasource";
import { LoginDTO } from "../../../domain/auth/dtos/login.dto";
import { LoginRepository } from "../../../domain/auth/repositories/login.repository";
import { LoginResponse } from "../../../domain/auth/useCases/login";

export class LoginRepositoryImplementation implements LoginRepository {

  constructor(
    private readonly loginDataSource: LoginDataSource
  ) {}

  login(dto: LoginDTO): Promise<LoginResponse> {
    return this.loginDataSource.login( dto );
  }

}