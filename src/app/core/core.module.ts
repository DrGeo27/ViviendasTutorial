import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { TableComponent } from "./table.component";
import { FormComponent } from "./form.component";
import { Subject } from "rxjs";
import { StatePipe } from "./state.pipe";
import { MessageModule } from "../messages/message.module";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { Model } from "../model/repository.model";
import { RouterModule } from "@angular/router";
import { ViviendaCountComponent } from "./viviendaCount.component";
import { ComercialCountComponent } from "./comercialCount.component";
import { NotFoundComponent } from "./notFound.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ModelModule, MessageModule, RouterModule],
  declarations: [TableComponent, FormComponent, StatePipe,
    ViviendaCountComponent, ComercialCountComponent, NotFoundComponent],
  exports: [ModelModule, TableComponent, FormComponent],
})

export class CoreModule { }
