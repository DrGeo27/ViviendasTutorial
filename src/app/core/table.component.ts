import { Component, Inject } from "@angular/core"; 
import { Vivienda } from "../model/vivienda.model"; 
import { Model } from "../model/repository.model"; 
import { ActivatedRoute } from "@angular/router"; 
 
@Component({ 
  selector: "viTable",
  templateUrl: "table.component.html" 
})

export class TableComponent {
  comercial: string = ""; 
 
  constructor(private model: Model, activeRoute: ActivatedRoute) { 
    activeRoute.params.subscribe(params => { 
      this.comercial = params["comercial"] || null; 
    }) 
  } 
 
  getVivienda(key: number): Vivienda { 
    return this.model.getVivienda(key); 
  } 
 
  getViviendas(): Vivienda[] { 
    return this.model.getViviendas().filter
      (c => this.comercial == null || c.comercial == this.comercial);
  } 
 
  get comerciales(): any[] { 
    return this.model.getViviendas().map
      (c => c.comercial).filter((comercial, index, array) =>
        array.indexOf(comercial) == index);
  }  
 
  deleteVivienda(key: any) { 
    this.model.deleteVivienda(key); 
  }
}
