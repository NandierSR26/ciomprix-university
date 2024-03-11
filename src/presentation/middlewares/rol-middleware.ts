import { ValidRoles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { handleError } from "../../config/handleResponse";

export class RolMiddleware {

  static verifyUserRol(req: Request, res: Response, next: NextFunction) {
    const {rol} = req.body.user;

    if(rol !== ValidRoles.ADMIN) return handleError({ code: 401, message: 'Not authorized - Rol not permited', res });
    next();
  }

}