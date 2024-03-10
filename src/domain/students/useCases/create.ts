import { CreateStudentDTO } from "../dtos/create.dto"
import { StudentEntity } from "../entities/student.entity"
import { StudentRepository } from "../repositories/student.repository"

export interface CreateStudentUseCase {
  execute( dto: CreateStudentDTO ): Promise<StudentEntity>
}

export class CreateStudent implements CreateStudentUseCase {

  constructor(
    private readonly repository: StudentRepository,
  ) {}
  
  execute( dto: CreateStudentDTO ): Promise<StudentEntity> {
    return this.repository.create(dto);
  }

}