import { StudentDataSource } from "../../../domain/students/dataSources/student.datasource";
import { CreateAdminDTO } from "../../../domain/students/dtos/create-admin.dto";
import { CreateStudentDTO } from "../../../domain/students/dtos/create.dto";
import { UpdateStudenDTO } from "../../../domain/students/dtos/update.dto";
import { AdminEntity } from "../../../domain/students/entities/admin.identity";
import { StudentEntity } from "../../../domain/students/entities/student.entity";
import { StudentRepository } from "../../../domain/students/repositories/student.repository";


export class StudentRepositoryImplementation implements StudentRepository {

  constructor(
    private readonly dataSource: StudentDataSource
  ) {}

  getAll(): Promise<StudentEntity[]> {
    return this.dataSource.getAll();
  };

  getByID(id: string): Promise<StudentEntity> {
    return this.dataSource.getByID( id );
  };

  create(createStudentDTO: CreateStudentDTO): Promise<StudentEntity> {
    return this.dataSource.create( createStudentDTO );
  };

  createAdmin(createAdminDTO: CreateAdminDTO): Promise<AdminEntity> {
    return this.dataSource.createAdmin( createAdminDTO )
  }

  updateByID(updateStudent: UpdateStudenDTO): Promise<StudentEntity> {
    return this.dataSource.updateByID( updateStudent );
  };

  delete(id: string): Promise<StudentEntity> {
    return this.dataSource.delete( id );
  };

  topStudentsWithEvidences(): Promise<StudentEntity[]> {
    return this.dataSource.topStudentsWithEvidences();
  }


}