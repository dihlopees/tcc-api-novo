export class DeleteUsersDTO {
  ids: Array<number>;

  constructor(ids: Array<number>) {
    this.ids = ids;
  }
}
