import { Component } from "@angular/core";

@Component({
  selector: "viNotFound",
  template: `<h3 class="bg-danger text-white p-2">
              Lo sentimos, algo fue mal </h3>
            <button class="btn btn-primary" routerLink="/">
              Comenzar de nuevo
            </button>`
})

export class NotFoundComponent { }
