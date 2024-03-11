import { EvidenceIdentity } from "../entities/evidence.entity";
import { EvidenceRepository } from "../repositories/evidence.repository";

export class GetAllEvidences {

  constructor(
    private readonly repository: EvidenceRepository
  ) {}

  execute(): Promise<EvidenceIdentity[]> {
    return this.repository.getAll();
  }

}