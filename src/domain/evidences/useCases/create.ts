import { CreateEvidenceDTO } from "../dtos/create.dto";
import { EvidenceIdentity } from "../entities/evidence.entity";
import { EvidenceRepository } from "../repositories/evidence.repository";

export class CreateEvidence {

  constructor(
    private readonly repository: EvidenceRepository
  ) {}

  execute( dto: CreateEvidenceDTO ): Promise<EvidenceIdentity> {
    return this.repository.create( dto );
  }

}