import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/mysql/prisma";
import { handleError } from "../../config/handleResponse";

export class ValidateEnroll {

  static async validateStudentInSubject(req: Request, res: Response, next: NextFunction)  {

    const id_student: string = req.body.id_student;
    const id_subject: string = req.body.id_subject;

    try {
      const repeatedEnroll = await prisma.estudiantes_asignaturas.findUnique({
        where: {
          id_student_id_subject: {
            id_student: id_student,
            id_subject: id_subject
          }
        }
      })

      if(repeatedEnroll) return handleError({ code: 400, message: 'This user is already enrolled in this subject.', res })

      next();
    } catch (error) {
      handleError({ code: 500, message: 'Internal server error' , res })
    }

  }

  static async validateAmountEnrolledSubject(req: Request, res: Response, next: NextFunction) {

    const id_student: string = req.body.id_student;

    try {
      const student = await prisma.estudiantes_asignaturas.findMany({
        where: {
          id_student
        },
        include: {
          asignarura: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      
      if(student.length >= 5) return handleError({ code: 400, message: 'This user is already enrolled in 5 subjects.', res, data: student })
      next();
    } catch (error) {
      handleError({ code: 500, message: 'Internal server error' , res })
    }

  }

}