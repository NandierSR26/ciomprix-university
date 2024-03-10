import { StudentEntity } from "../entities/student.entity"
import { StudentRepository } from "../repositories/student.repository"

export interface GetAllStudentsUseCase {
  execute(): Promise<StudentEntity[]>
}

export class GetAllStudents implements GetAllStudentsUseCase {

  constructor(
    private readonly repository: StudentRepository,
  ) {}
  
  execute(): Promise<StudentEntity[]> {
    return this.repository.getAll();
  }

}