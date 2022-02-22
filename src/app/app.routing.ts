import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component";
import { ViviendaCountComponent } from "./core/viviendaCount.component";
import { ComercialCountComponent } from "./core/comercialCount.component";

const routes: Routes = [
  { path: "form/:mode/:id", component: FormComponent },
  { path: "form/:mode", component: FormComponent },
  { path: "does", redirectTo: "/form/create", pathMatch: "prefix" },

  {
    path: "table", component: TableComponent,
    children: [
      { path: "viviendas", component: ViviendaCountComponent },
      { path: "comerciales", component: ComercialCountComponent }
    ]
  },

  { path: "table/:comercial", component: TableComponent },
  { path: "table", component: TableComponent },
  { path: "", redirectTo: "/table", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
]

export const routing = RouterModule.forRoot(routes);
