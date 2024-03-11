import { UpdateStudenDTO } from "../dtos/update.dto";
import { StudentEntity } from "../entities/student.entity";
import { StudentRepository } from "../repositories/student.repository";

interface UpdateStudentUseCase {
  execute( dto: UpdateStudenDTO ): Promise<StudentEntity>
}

export class UpdateStudent {

  constructor(
    private readonly repository: StudentRepository
  ) {}

  execute( dto: UpdateStudenDTO ): Promise<StudentEntity> {
    return this.repository.updateByID( dto );
  }

}