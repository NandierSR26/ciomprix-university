import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { handleError } from "../../config/handleResponse";
import { prisma } from "../../data/mysql/prisma";

export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction) {

    const authorization = req.header('Authorization');
    if( !authorization ) return res.status(401).json({ error: 'No token provided' });
    if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return handleError({ code: 401, message: 'Invalid token', res });

      const student = await prisma.students.findUnique({ where: {id: payload.id} });
      const admin = await prisma.admin.findUnique({ where: {id: payload.id} });

      const user = admin ? admin : student;
      if(!user) return handleError({ code: 401, message: 'Invalid token - user', res });

      req.body.user = user;
      next();
    } catch (error) {
      handleError({ code: 500, message: 'Internal server error', res })
    }

  }

}