import { CreateAdminDTO } from "../dtos/create-admin.dto";
import { AdminEntity } from "../entities/admin.identity";
import { StudentRepository } from "../repositories/student.repository"

export interface CreateAdminUseCase {
  execute( dto: CreateAdminDTO ): Promise<AdminEntity>
}

export class CreateAdmin implements CreateAdminUseCase {

  constructor(
    private readonly repository: StudentRepository,
  ) {}
  
  execute( dto: CreateAdminDTO ): Promise<AdminEntity> {
    return this.repository.createAdmin( dto );
  }

}