import { ValidRoles } from "@prisma/client";

export class CreateAdminDTO {

  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly rol: ValidRoles,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateAdminDTO?] {

    const { first_name, last_name, email, password, rol } = object;

    if (!first_name) return ['first_name is required']
    if (!last_name) return ['last_name is required']
    if (!email) return ['email is required']
    if (!password) return ['password is required']
    if (!rol) return ['rol is required']

    return [ undefined, new CreateAdminDTO( first_name, last_name, email, password, rol) ]

  }

}