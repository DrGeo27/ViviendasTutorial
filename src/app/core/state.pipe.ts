import { SharedState, MODES } from "./sharedState.model";
import { Model } from "../model/repository.model";
import { Pipe } from "@angular/core";

@Pipe({
  name: "formatState",
  pure: false
})

export class StatePipe {
  constructor(private model: Model) { }

  transform(value: any): string {
    if (value instanceof SharedState) {
      let state = value as SharedState;
      return MODES[state.mode] + (state.id != undefined ? `${this.model.getVivienda(state.id).name}` : "");
    } else {
      return "<No hay último evento>"
    }
  }
}
