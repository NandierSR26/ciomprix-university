import { prisma } from "../../../data/mysql/prisma";
import { SubjectDataSource } from "../../../domain/subjects/dataSources/subject.datasource";
import { CreateSubjectDTO } from "../../../domain/subjects/dtos/create.dto";
import { UpdateSubjectDTO } from "../../../domain/subjects/dtos/update.dto";
import { EnrollSubjectEntity } from "../../../domain/subjects/entities/enroll.entity";
import { SubjectEntity } from "../../../domain/subjects/entities/subject.entity";

export class SubjectDataSourceImplementation implements SubjectDataSource {
  
  async getAll(): Promise<SubjectEntity[]> {
    const subjects = await prisma.subjects.findMany();
    return subjects;
  }

  async getByID( id: string ): Promise<SubjectEntity> {
    const subject = await prisma.subjects.findUnique({
      where: {
        id
      }
    });

    if (!subject) throw(`Subject with ID ${id} not found`)
    return subject;
  }

  async getByUser(id_user: string): Promise<EnrollSubjectEntity[]> {
    const subjectsByUser = await prisma.estudiantes_asignaturas.findMany({
      where: {
        id_student: id_user
      },
      include: {
        asignarura: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        }
      }
    })

    return subjectsByUser;
  }

  async create( dto: CreateSubjectDTO ): Promise<SubjectEntity> {
    const newSubject = await prisma.subjects.create({
      data: dto
    });

    return newSubject;
  }

  async updateByID( dto: UpdateSubjectDTO ): Promise<SubjectEntity> {
    const updatedSubject = await prisma.subjects.update({
      where: { id: dto.id },
      data: dto.values
    });

    return updatedSubject;
  }

  async delete( id: string ): Promise<SubjectEntity> {
    const deletedSubject = await prisma.subjects.delete({
      where: { id }
    });

    return deletedSubject;
  }

  async enrollStudent(studentID: string, subjectID: string): Promise<void> {
    await prisma.estudiantes_asignaturas.create({ 
      data: { 
        id_student: studentID,
        id_subject: subjectID
      } 
    })
  }

  async evidenceBySubject(): Promise<SubjectEntity[]> {
    const evidencesVySubject = await prisma.subjects.findMany({
      include: {
        evidences: true
      }
    })

    return evidencesVySubject
  }

}