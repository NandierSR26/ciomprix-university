import { NextFunction, Request, Response } from "express";

export class EvidencesMiddleware {

  static validateEvidencesinSubjects(req: Request, res: Response, next: NextFunction) {
    // const { subject_id } = req.body;
    console.log(req.body)

    next();
  }

}