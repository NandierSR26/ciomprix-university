

export class UpdateStudenDTO {

  private constructor(
    public readonly id: string,
    public readonly first_name?: string,
    public readonly last_name?: string,
    public readonly password?: string,
    public readonly phone?: string,
    public readonly birth_date?: string,
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if( this.first_name ) returnObj.first_name = this.first_name;
    if( this.last_name ) returnObj.last_name = this.last_name;
    if( this.password ) returnObj.password = this.password;
    if( this.phone ) returnObj.phone = this.phone;
    if( this.birth_date ) returnObj.birth_date = this.birth_date;

    return returnObj;
  }


  static create(props: { [key: string]: any }): [string?, UpdateStudenDTO?] {

    const {id, first_name, last_name, password, phone, birth_date} = props;

    if (!id) return ['id is required'];
    // if (!first_name) return ['first_name is required']
    // if (!last_name) return ['last_name is required']
    // if (!password) return ['password is required']
    // if (!phone) return ['phone is required']
    // if (!birth_date) return ['birth_date is required']

    return [undefined, new UpdateStudenDTO( id, first_name, last_name, password, phone, birth_date )];
  }


}