import { Injectable } from "@angular/core";
import { Vivienda } from "./vivienda.model";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class Model {
  private viviendas: Vivienda[] = new Array<Vivienda>();
  private locator = (v: Vivienda, id: any) => v.id == id;

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getData().subscribe(data => this.viviendas = data);
  }

  getViviendas(): Vivienda[] {
    return this.viviendas;
  }

  getVivienda(id: number): any {
    return this.viviendas.find(v => this.locator(v, id));
  }

  getNextViviendaId(id: number): any {
    let index = this.viviendas.findIndex(v => this.locator(v, id));
    if (index > -1) {
      return this.viviendas[this.viviendas.length > index + 2 ? index + 1 : 0].id;
    } else {
      return id || 0;
    }
  }

  getPreviousViviendaid(id: number): any {
    let index = this.viviendas.findIndex(v => this.locator(v, id));
    if (index > -1) {
      return this.viviendas[index > 0 ? index - 1 : this.viviendas.length - 1].id;
    } else {
      return id || 0;
    }
  }

  saveVivienda(vivienda: any) {
    if (vivienda.id == 0 || vivienda.id == null) {
      this.dataSource.saveVivienda(vivienda).subscribe(v => this.viviendas.push(v));
    } else {
      this.dataSource.updateVivienda(vivienda).subscribe(v => {
        let index = this.viviendas.findIndex(item => this.locator(item, v.id));
        this.viviendas.splice(index, 1, v);
      });
    }
  }

  deleteVivienda(id: number) {
    this.dataSource.deleteVivienda(id).subscribe(() => {
      let index = this.viviendas.findIndex(v => this.locator(v, id));
      if (index > -1) {
        this.viviendas.splice(index, 1);
      }
    })
  }
}
