import { Util } from "sjs-base-model";
import camelCase from "lodash/camelCase";

export default class PropertyNormalizerUtility {
  static normalize(json: any) {
    const dataOrEmptyObject = json ? json : {};

    // Makes all property names camelCase so they are consistent in the application.
    // Also recursively goes through child objects.
    return Util.clone(dataOrEmptyObject, camelCase);
  }
}
