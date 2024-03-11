import { Request, Response } from "express";
import { LoginRepository } from "../../domain/auth/repositories/login.repository";
import { LoginDTO } from "../../domain/auth/dtos/login.dto";
import { handleError, handleSuccess } from "../../config/handleResponse";
import { LoginUseCase } from "../../domain/auth/useCases/login";

export class AuthControllers {

  constructor(
    private readonly loginRepository: LoginRepository,
  ) { }

  public login = (req: Request, res: Response) => {
    const [error, loginDTO] = LoginDTO.create(req.body);
    if (error) return handleError({ code: 400, message: error, res, error });

    new LoginUseCase(this.loginRepository)
      .execute(loginDTO!)
      .then(data => handleSuccess({ code: 200, message: 'Login success', res, data }))
      .catch(error => {

        console.log(error);
        handleError({ code: 500, message: error, res })
      })
  }

}