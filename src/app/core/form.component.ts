import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Vivienda } from "../model/vivienda.model";
import { Model } from "../model/repository.model"
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "viForm",
  templateUrl: "form.component.html",
  styleUrls: ["form.component.css"]
})

export class FormComponent {
  vivienda: Vivienda = new Vivienda();

  constructor(
    private model: Model,
    activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    let id = activeRoute.snapshot.params["id"];

    if (id != null) {
      Object.assign(this.vivienda, model.getVivienda(id) || new Vivienda());
    }
  };

  editing: boolean = false;

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveVivienda(this.vivienda);
      this.router.navigateByUrl("/");
    }
  }

  resetForm() {
    this.vivienda = new Vivienda();
  }
}
