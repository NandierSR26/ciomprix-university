import { Router } from "express";
import { EvidencesController } from "./controller";
import { EvidenceRepositoryImplementation } from "../../infraestucture/evidences/repositories/evidence.repository";
import { EvidencesDataSourceImplementation } from "../../infraestucture/evidences/dataSources/evidence.datasource";
import { upload } from "../utils/upload-files";

export class EvidencesRoutes {

  static get routes(): Router {
    const router = Router();

    const dataSource = new EvidencesDataSourceImplementation();
    const evidencesRepository = new EvidenceRepositoryImplementation( dataSource );
    const evidencesController = new EvidencesController( evidencesRepository )

    router.get('/', evidencesController.getAllEvidences);
    router.get('/:id', evidencesController.getEvidenceByID);

    router.delete('/:id', evidencesController.deleteEvidence);

    router.post('/', upload.single('evidence'), evidencesController.createEvidence);
    router.put('/:id', upload.single('evidence'), evidencesController.updateEvidence);

    return router;
  }

}