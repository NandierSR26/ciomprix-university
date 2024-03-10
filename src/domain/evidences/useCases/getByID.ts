import { EvidenceIdentity } from "../entities/evidence.entity";
import { EvidenceRepository } from "../repositories/evidence.repository";

export class GetEvidenceByID {

  constructor(
    private readonly repository: EvidenceRepository
  ) {}

  execute( id: string ): Promise<EvidenceIdentity> {
    return this.repository.getByID( id );
  }

}