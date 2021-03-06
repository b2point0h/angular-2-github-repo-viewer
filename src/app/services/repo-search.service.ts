import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptionsArgs } from "@angular/http";
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { RepoList } from "../models/repolist";
import { Repo } from "../models/repo";
import { IssueList } from "../models/issuelist";

@Injectable({
  providedIn: 'root'
})
export class RepoSearchService {

  private headers: Headers = new Headers();
  private requestOptions: RequestOptionsArgs = {};
  private apiServer: string = "https://api.github.com";

  constructor(private http: Http) {

    this.headers.set("Content-type", "application/json");
    this.requestOptions.headers = this.headers;

  }

  get(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.createUrl(endPoint), this.getRequestOptions(options));
  }

  createUrl(endPoint): string {

    let url = this.apiServer + endPoint;
    if (!endPoint.startsWith('/')) {
        url = this.apiServer + '/' + endPoint;
    }

    return url;
  }

  options(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {

    return this.http.post(this.createUrl(endPoint), this.getRequestOptions(options));
  }

  getRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

      this.requestOptions.headers = this.headers;
      if (options) {
          Object.assign(options, this.requestOptions);
      }

      return this.requestOptions;
  }

  getDetails(owner: string, id: string): Observable<any> {

    let endPoint = '/repos/' + owner + '/' + id;

    return this.get(endPoint)
                .pipe(map(res => res.json() as Repo), catchError(err => Observable.throw(err)));
                
  }

  getIssues(owner: string, id: string, filter?: string): Observable<IssueList[]> {

    let endPoint = '/repos/' + owner  + '/' + id + '/issues?state=' + filter;

    return this.get(endPoint)
                .pipe(map(res => res.json() as IssueList[], catchError(err => Observable.throw(err))));
  }
  

  search(q: string): Observable<any> {
    let endPoint = '/search/repositories?q=' + q;
        
    return this.get(endPoint)
                .pipe(map(res => res.json() as RepoList[], catchError(err => Observable.throw(err))));
  }
}
