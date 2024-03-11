import { StudentEntity } from "../entities/student.entity";
import { StudentRepository } from "../repositories/student.repository";

export class TopStudentsWithEvidences {

  constructor(
    private readonly repository: StudentRepository
  ) {}

  execute(): Promise<StudentEntity[]> {
    return this.repository.topStudentsWithEvidences();
  }

}