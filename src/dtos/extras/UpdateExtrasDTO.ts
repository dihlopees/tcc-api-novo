export class UpdateExtrasDTO {
  unit?: string;
  availableQuantity?: number;
  name?: string;

  constructor(name?: string, unit?: string, availableQuantity?: number) {
    this.name = name;
    this.availableQuantity = availableQuantity;
    this.unit = unit;
  }
}
