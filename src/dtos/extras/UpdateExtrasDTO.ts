export class UpdateExtrasDTO {
  id: number;
  unit?: string;
  availableQuantity?: number;
  name?: string;

  constructor(
    id: number,
    name?: string,
    unit?: string,
    availableQuantity?: number,
  ) {
    this.id = id;
    this.name = name;
    this.availableQuantity = availableQuantity;
    this.unit = unit;
  }
}
