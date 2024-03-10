import { StudentEntity } from "../entities/student.entity";
import { StudentRepository } from "../repositories/student.repository";

interface GetStudentByIDUseCase {
  execute( id: string ): Promise<StudentEntity>
}

export class GetStudentByID implements GetStudentByIDUseCase {

  constructor(
    private readonly repository: StudentRepository
  ) {}

  execute( id: string ) {
    return this.repository.getByID( id )
  }

}