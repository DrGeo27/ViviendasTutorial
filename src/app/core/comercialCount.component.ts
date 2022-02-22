import { Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
  selector: "viComercialCount",
  template: `<div class="bg-primary p-2 text-white">
              Hay {{count}} comerciales en la lista
            </div>`
})

export class ComercialCountComponent {
  private differ: KeyValueDiffer<any, any> | any;
  count: number = 0;

  constructor(
    private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.differ = this.keyValueDiffers.find(this.model.getViviendas()).create();
  }

  ngDoCheck() {
    if (this.differ.diff(this.model.getViviendas()) != null) {
      this.count = this.model.getViviendas().map(c => c.comercial)
        .filter((category, index, array) => array.indexOf(category) == index)
        .length;
    }
  }
}
