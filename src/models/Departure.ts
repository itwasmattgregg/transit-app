import { BaseModel } from "sjs-base-model";

export default class Departure extends BaseModel {
  public readonly departureText: string = "";
  public readonly description: string = "";

  constructor(data: Partial<Departure>) {
    super();
    this.update(data);
  }
}
