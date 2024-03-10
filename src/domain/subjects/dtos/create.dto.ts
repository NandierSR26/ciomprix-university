export class CreateSubjectDTO {

  constructor(
    public readonly name: string,
    public readonly description: string,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateSubjectDTO?] {

    const { name, description } = props;

    if(!name) return ['name is required'];
    if(!description) return ['description is required'];

    return [undefined, new CreateSubjectDTO(name, description)];

  }

}