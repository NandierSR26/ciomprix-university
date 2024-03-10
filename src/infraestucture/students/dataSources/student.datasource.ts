import { bcryptAdapter } from "../../../config/bcrypt.adapter";
import { prisma } from "../../../data/mysql/prisma";
import { StudentDataSource } from "../../../domain/students/dataSources/student.datasource";
import { CreateAdminDTO } from "../../../domain/students/dtos/create-admin.dto";
import { CreateStudentDTO } from "../../../domain/students/dtos/create.dto";
import { UpdateStudenDTO } from "../../../domain/students/dtos/update.dto";
import { AdminEntity } from "../../../domain/students/entities/admin.identity";
import { StudentEntity } from "../../../domain/students/entities/student.entity";

export class StudentDataSourceImplementation implements StudentDataSource {
  
  async getAll(): Promise<StudentEntity[]> {
    const students = await prisma.students.findMany({
      include: {
        subjects: {
          select: {
            asignarura: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        }
      },
      orderBy: {
        last_name: "asc"
      }
    });
    return students;
  }

  async getByID (id: string): Promise<StudentEntity> {
    const student = await prisma.students.findUnique({
      where: {
        id
      }
    });

    if( !student ) throw(`Student with ID ${id} not found`);
    return student;
  }

  async create ({password, ...createStudentDTO}: CreateStudentDTO): Promise<StudentEntity> {

    const hashedPassword = bcryptAdapter.hash(password)

    const student = await prisma.students.create({
      data: {
        ...createStudentDTO,
        password: hashedPassword
      }
    })
    return student
  }

  async createAdmin({ password, ...createAdminDTO }: CreateAdminDTO): Promise<AdminEntity> {

    const hashedPassword = bcryptAdapter.hash(password)

    const student = await prisma.admin.create({
      data: {
        ...createAdminDTO,
        password: hashedPassword
      }
    })
    return student
  }

  async updateByID (updateStudentDTO: UpdateStudenDTO): Promise<StudentEntity> {

    const updatedStudent = await prisma.students.update({
      where: { id: updateStudentDTO.id },
      data: updateStudentDTO!.values
    })
    return updatedStudent
  }

  async delete (id: string): Promise<StudentEntity> {
    const deletedStudent = await prisma.students.delete({
      where: {
        id
      }
    })

    return deletedStudent
  }

  async topStudentsWithEvidences(): Promise<StudentEntity[]> {
    const students = await prisma.students.findMany({
      include: {
        evidences: {
          select: {id: true}
        }
      }
    })

    return students;
  }

}