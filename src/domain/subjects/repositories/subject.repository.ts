import { CreateSubjectDTO } from "../dtos/create.dto";
import { UpdateSubjectDTO } from "../dtos/update.dto";
import { SubjectEntity } from "../entities/subject.entity";

export abstract class SubjectRepository {
  abstract getAll(): Promise<SubjectEntity[]>;
  abstract getByID( id: string ): Promise<SubjectEntity>;
  abstract create( dto: CreateSubjectDTO ): Promise<SubjectEntity>;
  abstract updateByID( dto: UpdateSubjectDTO ): Promise<SubjectEntity>;
  abstract delete( id: string ): Promise<SubjectEntity>;
  abstract enrollStudent( studentID: string, subjectID: string ): Promise<void>;
}