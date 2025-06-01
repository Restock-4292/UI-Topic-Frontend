export class UnitMeasurement {
  id: number;
  name: string;
  symbol: string;

  constructor(data: { id: number; name: string; symbol: string }) {
    this.id = data.id;
    this.name = data.name;
    this.symbol = data.symbol;
  }
}
