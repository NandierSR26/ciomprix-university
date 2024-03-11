import { LoginDTO } from "../dtos/login.dto";
import { LoginResponse } from "../useCases/login";

export abstract class LoginDataSource {

  abstract login( dto: LoginDTO ): Promise<LoginResponse>

}