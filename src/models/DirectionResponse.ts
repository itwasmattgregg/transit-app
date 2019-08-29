import { BaseModel } from "sjs-base-model";
import Direction from "./Direction";

export default class DirectionResponse extends BaseModel {
  public readonly data: Direction[] = [Direction as any];

  constructor(data: Partial<DirectionResponse>) {
    super();

    this.update(data);
  }
}
