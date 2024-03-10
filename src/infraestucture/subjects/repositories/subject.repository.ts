import { SubjectDataSource } from "../../../domain/subjects/dataSources/subject.datasource";
import { CreateSubjectDTO } from "../../../domain/subjects/dtos/create.dto";
import { UpdateSubjectDTO } from "../../../domain/subjects/dtos/update.dto";
import { SubjectEntity } from "../../../domain/subjects/entities/subject.entity";
import { SubjectRepository } from "../../../domain/subjects/repositories/subject.repository";

export class SubjectRepositoryImplementation implements SubjectRepository {

  constructor(
    private readonly dataSource: SubjectDataSource
  ) {}

  getAll(): Promise<SubjectEntity[]> {
    return this.dataSource.getAll();
    
  }
  getByID(id: string): Promise<SubjectEntity> {
    return this.dataSource.getByID( id );
    
  }
  create(dto: CreateSubjectDTO): Promise<SubjectEntity> {
    return this.dataSource.create( dto );
    
  }
  updateByID(dto: UpdateSubjectDTO): Promise<SubjectEntity> {
    return this.dataSource.updateByID( dto );
  }

  delete(id: string): Promise<SubjectEntity> {
    return this.dataSource.delete( id );
    
  }

}