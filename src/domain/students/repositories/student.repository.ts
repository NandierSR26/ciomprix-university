import { CreateAdminDTO } from "../dtos/create-admin.dto";
import { CreateStudentDTO } from "../dtos/create.dto";
import { UpdateStudenDTO } from "../dtos/update.dto";
import { AdminEntity } from "../entities/admin.identity";
import { StudentEntity } from "../entities/student.entity";

export abstract class StudentRepository {

  abstract getAll(): Promise<StudentEntity[]>;
  abstract getByID( id: string ): Promise<StudentEntity>;
  abstract create( createStudentDTO: CreateStudentDTO ): Promise<StudentEntity>;
  abstract createAdmin( createAdminDTO: CreateAdminDTO ): Promise<AdminEntity>;
  abstract updateByID( updateStudentDTO: UpdateStudenDTO ): Promise<StudentEntity>;
  abstract delete( id: string ): Promise<StudentEntity>;
  abstract topStudentsWithEvidences(): Promise<StudentEntity[]>;

}