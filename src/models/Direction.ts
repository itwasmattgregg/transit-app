import { BaseModel } from "sjs-base-model";

export default class Direction extends BaseModel {
  public readonly text: string = "";
  public readonly value: string = "";

  constructor(data: Partial<Direction>) {
    super();
    this.update(data);
  }

  getSelectOptions() {
    return {
      label: this.text,
      value: this.value
    };
  }
}
