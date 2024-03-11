import { ValidRoles } from "@prisma/client";

export class CreateStudentDTO {

  constructor(
    public readonly DNI: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phone: string,
    public readonly birth_date: string,
    public readonly rol: ValidRoles,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateStudentDTO?] {

    const { DNI, first_name, last_name, email, password, phone, birth_date, rol } = object;

    if (!DNI) return ['DNI is required']
    if (!first_name) return ['first_name is required']
    if (!last_name) return ['last_name is required']
    if (!email) return ['email is required']
    if (!password) return ['password is required']
    if (!phone) return ['phone is required']
    if (!birth_date) return ['birth_date is required']
    if (!rol) return ['rol is required']

    return [ undefined, new CreateStudentDTO(DNI, first_name, last_name, email, password, phone, birth_date, rol) ]

  }

}