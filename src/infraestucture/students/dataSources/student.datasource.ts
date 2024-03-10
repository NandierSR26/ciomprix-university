import { prisma } from "../../../data/mysql/prisma";
import { StudentDataSource } from "../../../domain/students/dataSources/student.datasource";
import { CreateStudentDTO } from "../../../domain/students/dtos/create.dto";
import { UpdateStudenDTO } from "../../../domain/students/dtos/update.dto";
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

  async create (createStudentDTO: CreateStudentDTO): Promise<StudentEntity> {
    const student = await prisma.students.create({
      data: createStudentDTO
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

}