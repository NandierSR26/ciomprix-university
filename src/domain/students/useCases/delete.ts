import { StudentEntity } from "../entities/student.entity";
import { StudentRepository } from "../repositories/student.repository";

interface DeleteStudentUseCase {
  execute( id: string ): Promise<StudentEntity>
}

export class DeleteStudent implements DeleteStudentUseCase {

  constructor(
    private readonly repository: StudentRepository
  ) {}

  execute( id: string ) {
    return this.repository.delete( id );
  }

}