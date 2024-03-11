import { UpdateEvidencesDTO } from "../dtos/update.dto";
import { EvidenceIdentity } from "../entities/evidence.entity";
import { EvidenceRepository } from "../repositories/evidence.repository";

export class UpdateEvidence {

  constructor(
    private readonly repository: EvidenceRepository
  ) {}

  execute( dto: UpdateEvidencesDTO ): Promise<EvidenceIdentity> {
    return this.repository.update( dto );
  }

}