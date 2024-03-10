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
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

export class EvidencesController {

  constructor(
    private readonly evidencesRepository: EvidenceRepository,
    private readonly fileUploadService: FileUploadService
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
      .catch(error => handleError({ code: 500, message: 'Internal server error', res, error }))
  }

  public createEvidence = (req: Request, res: Response) => {

    const files = req.body.files as UploadedFile[];
    console.log(files)
    return

    if (files.length > 5) throw new Error('You can only upload 5 files per subject')
    
    this.fileUploadService.uploadMultiple( files, `public/uploads/` )
      .then( uploaded => handleSuccess({code: 200, message: 'Evidence created', res, data: uploaded}) )
      .catch(  error => handleError({ code: 500, message: 'Internal server error', res, error }))

    const [error, createEvidenceDTO] = CreateEvidenceDTO.create(req.body);
    if (error) return handleError({ code: 400, message: error!, res, error });

    new CreateEvidence(this.evidencesRepository)
      .execute(createEvidenceDTO!)
      .then(data => handleSuccess({ code: 200, message: `Evidence created`, res, data }))
      .catch(error => handleError({ code: 500, message: 'Internal server error', res, error }))
  }

  public updateEvidence = (req: Request, res: Response) => {
    const { id } = req.params;
    const [ error, updateEvidenceDTO ] = UpdateEvidencesDTO.create({ ...req.body, id });
    if( error ) return handleError({ code: 400, message: error!, res, error });
    
    new UpdateEvidence( this.evidencesRepository )
      .execute( updateEvidenceDTO! )
      .then(data => handleSuccess({ code: 200, message: `Evidence with ID ${id} updated`, res, data }))
      .catch(error => handleError({ code: 500, message: 'Internal server error', res, error }))

  }

  public deleteEvidence = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteEvidence( this.evidencesRepository )
      .execute( id )
      .then(data => handleSuccess({ code: 200, message: `Evidence with ID ${id} deleted`, res, data }))
      .catch(error => handleError({ code: 500, message: 'Internal server error', res, error }))
  }


}