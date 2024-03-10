import { Router } from "express";
import { EvidencesController } from "./controller";
import { EvidenceRepositoryImplementation } from "../../infraestucture/evidences/repositories/evidence.repository";
import { EvidencesDataSourceImplementation } from "../../infraestucture/evidences/dataSources/evidence.datasource";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";

export class EvidencesRoutes {

  static get routes(): Router {
    const router = Router();

    const fileUploadService = new FileUploadService();
    const dataSource = new EvidencesDataSourceImplementation();
    const evidencesRepository = new EvidenceRepositoryImplementation( dataSource );
    const evidencesController = new EvidencesController( evidencesRepository, fileUploadService )

    router.get('/', evidencesController.getAllEvidences);
    router.get('/:id', evidencesController.getEvidenceByID);

    router.post('/', [
      FileUploadMiddleware.containFiles
    ], evidencesController.createEvidence);

    router.put('/:id', evidencesController.updateEvidence);

    router.delete('/:id', evidencesController.deleteEvidence);

    return router;
  }

}