import { ValidRoles } from "@prisma/client";

export class UserEntity {

  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public rol: ValidRoles,
  ) {}

}