import { BaseModel } from "sjs-base-model";

export default class Stop extends BaseModel {
  public readonly text: string = "";
  public readonly value: string = "";

  constructor(data: Partial<Stop>) {
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
