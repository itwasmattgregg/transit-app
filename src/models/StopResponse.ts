import { BaseModel } from "sjs-base-model";
import Stop from "./Stop";

export default class StopResponse extends BaseModel {
  public readonly data: Stop[] = [Stop as any];

  constructor(data: Partial<StopResponse>) {
    super();

    this.update(data);
  }
}
