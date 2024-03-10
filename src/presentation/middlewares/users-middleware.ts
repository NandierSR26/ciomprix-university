import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/mysql/prisma";
import { handleError } from "../../config/handleResponse";

export class validateUsersExists {

  static async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await prisma.students.findUnique({ where: { email } })
    const admin = await prisma.admin.findUnique({ where: { email } })

    if (user || admin) return handleError({ code: 400, message: 'There is already an account registered with that email', res })

    next();
  }

  static async validateDNI(req: Request, res: Response, next: NextFunction) {
    const { DNI } = req.body;

    const user = await prisma.students.findUnique({ where: { DNI } })

    if (user) return handleError({ code: 400, message: 'There is already an account registered with that DNI', res })

    next();
  }

  static async validateEmailExistsLogin(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await prisma.students.findUnique({ where: { email } })
    const admin = await prisma.admin.findUnique({ where: { email } })

    if (!user && !admin) return handleError({ code: 400, message: 'There is no user with that email', res })

    next();
  }

}