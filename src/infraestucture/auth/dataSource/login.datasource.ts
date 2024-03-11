import { bcryptAdapter } from "../../../config/bcrypt.adapter";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { prisma } from "../../../data/mysql/prisma";
import { LoginDataSource } from "../../../domain/auth/dataSources/login.datasource";
import { LoginDTO } from "../../../domain/auth/dtos/login.dto";
import { UserEntity } from "../../../domain/auth/entities/user.entity";
import { LoginResponse } from "../../../domain/auth/useCases/login";

export class LoginDataSourceImplementation implements LoginDataSource {

  async login(dto: LoginDTO): Promise<LoginResponse> {

    const student = await prisma.students.findUnique({ where: { email: dto.email } });
    const admin = await prisma.admin.findUnique({ where: { email: dto.email } });

    if( !student && !admin ) throw(`There is no user with that email`);

    const user: UserEntity = admin ? admin! : student!;

    const isMatching = bcryptAdapter.compare( dto.password, user!.password );
    if (!isMatching) throw('Wrong password');

    const token = await JwtAdapter.generateToken({ id: user!.id });
    if ( !token ) throw('Error while creating JWT');

    return {
      user,
      token
    }
    
  }

}