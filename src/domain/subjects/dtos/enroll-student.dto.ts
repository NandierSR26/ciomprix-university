
export class EnrollStudentDTO {

  constructor(
    public readonly id_student: string,
    public readonly id_subject: string,
  ) { }

  static create(props: { [key: string]: any }): [string?, EnrollStudentDTO?] {

    const { id_student, id_subject } = props;

    if (!id_student) return ['Student ID is required'];
    if (!id_subject) return ['Subject ID is required'];

    return [undefined, new EnrollStudentDTO(id_student, id_subject)];
  }

}