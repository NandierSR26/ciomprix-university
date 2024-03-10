import { ValidRoles } from "@prisma/client";


export class StudentEntity {

  constructor(
    public id: string,
    public DNI: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public phone: string,
    public birth_date: string,
    public rol: ValidRoles,
  ) {}

}