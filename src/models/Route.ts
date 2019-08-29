import { BaseModel } from "sjs-base-model";

export default class Route extends BaseModel {
  public readonly description: string = "";
  public readonly route: string = "";

  constructor(data: Partial<Route>) {
    super();
    this.update(data);
  }

  getSelectOptions() {
    return {
      label: this.description,
      value: this.route
    };
  }
}
