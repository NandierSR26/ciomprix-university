import { prisma } from "../../../data/mysql/prisma";
import { EvidenceDataSource } from "../../../domain/evidences/dataSources/evidence.datasource";
import { CreateEvidenceDTO } from "../../../domain/evidences/dtos/create.dto";
import { UpdateEvidencesDTO } from "../../../domain/evidences/dtos/update.dto";
import { EvidenceIdentity } from "../../../domain/evidences/entities/evidence.entity";

export class EvidencesDataSourceImplementation implements EvidenceDataSource {

  async getAll(): Promise<EvidenceIdentity[]> {
    const evidences = await prisma.evidences.findMany();
    return evidences;
  }

  async getByID(id: string): Promise<EvidenceIdentity> {
    const evidence = await prisma.evidences.findUnique({
      where: {
        id
      }
    });

    if(!evidence) throw(`Evidence with ID ${id} not found`);
    return evidence
  }

  async create(dto: CreateEvidenceDTO): Promise<EvidenceIdentity> {
    const newEvidence = await prisma.evidences.create({
      data: dto
    });

    return newEvidence;
  }

  async update(dto: UpdateEvidencesDTO): Promise<EvidenceIdentity> {
    const updatedEvidence = await prisma.evidences.update({
      where: { id: dto.id },
      data: dto.values
    });

    console.log({dto})

    return updatedEvidence;
  }

  async delete(id: string): Promise<EvidenceIdentity> {
    const deletedEvidence = await prisma.evidences.delete({
      where: {id}
    });

    return deletedEvidence;
  }


}