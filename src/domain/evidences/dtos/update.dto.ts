
export class UpdateEvidencesDTO {

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly size: number,
    public readonly format: string,
    public readonly date: string,
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if( this.name ) returnObj.name = this.name;
    if( this.size ) returnObj.size = this.size;
    if( this.format ) returnObj.format = this.format;
    if( this.date ) returnObj.date = this.date;

    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdateEvidencesDTO?] {

    const { id, name, size, format, date } = object;

    if (!id) return ['id is required'];
    if (!name) return ['name is required'];
    if (!size) return ['size is required'];
    if (!format) return ['format is required'];
    if (!date) return ['date is required'];

    return [undefined, new UpdateEvidencesDTO(id, name, size, format, date)];
  }

}