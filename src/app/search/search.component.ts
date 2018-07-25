import { Component, OnInit } from '@angular/core';
import { RepoList } from "../models/repolist";
import { RepoSearchService } from "../services/repo-search.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  repos: RepoList[] = [];
  search: Subject<string> = new Subject<string>();

  constructor(private repoServiceSearch: RepoSearchService) {

    this.search.subscribe((searchTerm) => {

        // call to user service and search by query
        this.repoServiceSearch.search(searchTerm).subscribe(res => {

            this.repos = res.items as RepoList[];
        });
    })
  }

  onSubmit(q: string) {
    this.search.next(q);
  } 

}
