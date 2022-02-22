import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Vivienda } from "./vivienda.model";
import { catchError } from "rxjs/operators";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()

export class RestDataSource {
  constructor(private http: HttpClient,
    @Inject(REST_URL) private url: string) { }

  getData(): Observable<Vivienda[]> {
    return this.sendRequest<Vivienda[]>("GET", this.url);
  }

  saveVivienda(vivienda: Vivienda): Observable<Vivienda> {
    return this.sendRequest<Vivienda>("POST", this.url, vivienda);
  }

  updateVivienda(vivienda: Vivienda): Observable<Vivienda> {
    return this.sendRequest<Vivienda>("PUT", `${this.url}/${vivienda.id}`, vivienda);
  }

  deleteVivienda(id: number): Observable<Vivienda> {
    return this.sendRequest<Vivienda>("DELETE", `${this.url}/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Vivienda): Observable<T> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set("Access-Key", "<secret>");
    myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

    return this.http.request<T>(verb, url, {
      body: body,
      headers: myHeaders
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
