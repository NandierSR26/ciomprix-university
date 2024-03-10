
export class CreateEvidenceDTO {

  constructor(
    public readonly name: string,
    public readonly size: number,
    public readonly format: string,
    public readonly date: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateEvidenceDTO?] {

    const { name, size, format, date } = object;

    if(!name) return ['name is required']
    if(!size) return ['size is required']
    if(!format) return ['format is required']
    if(!date) return ['date is required']

    return [undefined, new CreateEvidenceDTO(name, size, format, date)]

  }

}