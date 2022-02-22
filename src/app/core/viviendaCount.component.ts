import { Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef } from "@angular/core";
import { Model } from "../model/repository.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "viViviendaCount",
  template: `<div class="bg-info p-2">
              Hay {{count}} viviendas en la lista
            </div>`
})

export class ViviendaCountComponent {
  private differ: KeyValueDiffer<any, any> | any;
  count: number = 0;
  private comercial: any;

  constructor(
    private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef,
    activeRoute: ActivatedRoute
  ) {

    activeRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
      if (params["comercial"] != null) {
        this.comercial = params["comercial"];
        this.updateCount();
      }
    }))
  }

  ngOnInit() {
    this.differ = this.keyValueDiffers.find(this.model.getViviendas()).create();
  }

  ngDoCheck() {
    if (this.differ.diff(this.model.getViviendas()) != null) {
      this.updateCount();
    }
  }

  private updateCount() {
    this.count = this.model.getViviendas()
      .filter(c => this.comercial == null || c.comercial == this.comercial).length;
  }
}
