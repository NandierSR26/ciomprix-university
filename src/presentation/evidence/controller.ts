import { GetAllEvidences } from './../../domain/evidences/useCases/getAll';
import { EvidenceRepository } from "../../domain/evidences/repositories/evidence.repository";
import { Request, Response } from 'express';
import { handleError, handleSuccess } from '../../config/handleResponse';
import { GetEvidenceByID } from '../../domain/evidences/useCases/getByID';
import { CreateEvidenceDTO } from '../../domain/evidences/dtos/create.dto';
import { CreateEvidence } from '../../domain/evidences/useCases/create';
import { UpdateEvidencesDTO } from '../../domain/evidences/dtos/update.dto';
import { UpdateEvidence } from '../../domain/evidences/useCases/update';
import { DeleteEvidence } from '../../domain/evidences/useCases/delete';
import { formatDate } from '../utils/format-date';

export class EvidencesController {

  private validFormats = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf'
  ]

  constructor(
    private readonly evidencesRepository: EvidenceRepository,
  ) { }

  public getAllEvidences = (req: Request, res: Response) => {
    new GetAllEvidences(this.evidencesRepository)
      .execute()
      .then(data => handleSuccess({ code: 200, message: 'List evidences', res, data }))
      .catch(error => handleError({ code: 500, message: 'Internal server error', res, error }))
  }

  public getEvidenceByID = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetEvidenceByID(this.evidencesRepository)
      .execute(id)
      .then(data => handleSuccess({ code: 200, message: `Evidence with ID ${id} found`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public createEvidence = (req: Request, res: Response) => {

    const { filename, size, mimetype } = req.file!;
    const { subject_id, student_id } = req.body;

    const evidenceData = {
      name: filename,
      size: size/1000,
      format: mimetype,
      date: formatDate(Date.now()),
      subject_id,
      student_id
    }

    if(!this.validFormats.includes(mimetype)) return handleError({ code: 400, message: 'File format not allowed', res });


    const [error, createEvidenceDTO] = CreateEvidenceDTO.create(evidenceData);
    if (error) return handleError({ code: 400, message: error!, res, error });

    new CreateEvidence(this.evidencesRepository)
      .execute(createEvidenceDTO!)
      .then(data => handleSuccess({ code: 200, message: `Evidence created`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public updateEvidence = (req: Request, res: Response) => {
    const { id } = req.params;
    const { filename, size, mimetype } = req.file!;

    const evidenceData = {
      name: filename,
      size: size/1000,
      format: mimetype,
      date: formatDate(Date.now()),
    }

    if(!this.validFormats.includes(mimetype)) return handleError({ code: 400, message: 'File format not allowed', res });

    const [error, updateEvidenceDTO] = UpdateEvidencesDTO.create({ evidenceData, id });
    if (error) return handleError({ code: 400, message: error!, res, error });

    new UpdateEvidence(this.evidencesRepository)
      .execute(updateEvidenceDTO!)
      .then(data => handleSuccess({ code: 200, message: `Evidence with ID ${id} updated`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res }))

  }

  public deleteEvidence = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteEvidence(this.evidencesRepository)
      .execute(id)
      .then(data => handleSuccess({ code: 200, message: `Evidence with ID ${id} deleted`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res }))
  }


}