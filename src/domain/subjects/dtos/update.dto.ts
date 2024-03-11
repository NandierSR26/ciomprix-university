

export class UpdateSubjectDTO {

  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if( this.name ) returnObj.name = this.name;
    if( this.description ) returnObj.description = this.description;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateSubjectDTO?] {

    const { id, name, description } = props;
    if(!id) return ['ID is required'];
    return [undefined, new UpdateSubjectDTO(id, name, description)]

  }

}