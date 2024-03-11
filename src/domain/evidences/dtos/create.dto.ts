
export class CreateEvidenceDTO {

  constructor(
    public readonly name: string,
    public readonly size: number,
    public readonly format: string,
    public readonly date: string,
    public readonly subject_id: string,
    public readonly student_id: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateEvidenceDTO?] {

    const { name, size, format, date, subject_id, student_id } = object;

    if(!name) return ['name is required']
    if(!size) return ['size is required']
    if(!format) return ['format is required']
    if(!date) return ['date is required']
    if(!subject_id) return ['subject_id is required']
    if(!student_id) return ['student_id is required']

    return [undefined, new CreateEvidenceDTO(name, size, format, date, subject_id, student_id)]

  }

}