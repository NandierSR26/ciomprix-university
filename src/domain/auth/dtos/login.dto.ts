import { ValidRoles } from "@prisma/client";

export class LoginDTO {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, LoginDTO?] {

    const { email, password } = object;

    if (!email) return ['email is required']
    if (!password) return ['password is required']

    return [undefined, new LoginDTO( email, password )]
  }
}