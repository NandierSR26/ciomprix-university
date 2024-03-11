import { CreateEvidenceDTO } from "../dtos/create.dto";
import { UpdateEvidencesDTO } from "../dtos/update.dto";
import { EvidenceIdentity } from "../entities/evidence.entity";

export abstract class EvidenceRepository {

  abstract getAll(): Promise<EvidenceIdentity[]>;
  abstract getByID( id: string ): Promise<EvidenceIdentity>;
  abstract create( dto: CreateEvidenceDTO ): Promise<EvidenceIdentity>;
  abstract update( dto: UpdateEvidencesDTO ): Promise<EvidenceIdentity>;
  abstract delete( id: string ): Promise<EvidenceIdentity>;

}