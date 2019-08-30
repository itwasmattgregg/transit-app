import { BaseModel } from "sjs-base-model";
import Departure from "./Departure";

export default class DepartureResponse extends BaseModel {
  public readonly data: Departure[] = [Departure as any];

  constructor(data: Partial<DepartureResponse>) {
    super();

    this.update(data);
  }
}
