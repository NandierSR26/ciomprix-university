import { EvidenceDataSource } from "../../../domain/evidences/dataSources/evidence.datasource";
import { CreateEvidenceDTO } from "../../../domain/evidences/dtos/create.dto";
import { UpdateEvidencesDTO } from "../../../domain/evidences/dtos/update.dto";
import { EvidenceIdentity } from "../../../domain/evidences/entities/evidence.entity";
import { EvidenceRepository } from "../../../domain/evidences/repositories/evidence.repository";

export class EvidenceRepositoryImplementation implements EvidenceRepository {

  constructor(
    private readonly dataSource: EvidenceDataSource
  ) {}

  getAll(): Promise<EvidenceIdentity[]> {
    return this.dataSource.getAll();
  }

  getByID(id: string): Promise<EvidenceIdentity> {
    return this.dataSource.getByID( id );
  }

  create(dto: CreateEvidenceDTO): Promise<EvidenceIdentity> {
    return this.dataSource.create( dto );
  }

  update(dto: UpdateEvidencesDTO): Promise<EvidenceIdentity> {
    return this.dataSource.update( dto );
  }

  delete(id: string): Promise<EvidenceIdentity> {
    return this.dataSource.delete( id );
  }


}