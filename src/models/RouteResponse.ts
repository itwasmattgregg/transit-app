import { BaseModel } from "sjs-base-model";
import Route from "./Route";

export default class RouteResponse extends BaseModel {
  public readonly data: Route[] = [Route as any];

  constructor(data: Partial<RouteResponse>) {
    super();

    this.update(data);
  }
}
