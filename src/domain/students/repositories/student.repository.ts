import { CreateStudentDTO } from "../dtos/create.dto";
import { UpdateStudenDTO } from "../dtos/update.dto";
import { StudentEntity } from "../entities/student.entity";

export abstract class StudentRepository {

  abstract getAll(): Promise<StudentEntity[]>;
  abstract getByID( id: string ): Promise<StudentEntity>;
  abstract create( createStudentDTO: CreateStudentDTO ): Promise<StudentEntity>;
  abstract updateByID( updateStudentDTO: UpdateStudenDTO ): Promise<StudentEntity>;
  abstract delete( id: string ): Promise<StudentEntity>;

}