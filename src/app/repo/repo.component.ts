import { Component, OnInit } from '@angular/core';
import { Repo } from "../models/repo";
import { IssueList } from "../models/issuelist";
import { RepoSearchService } from "../services/repo-search.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  repo: Repo;
  issues: IssueList[];  
  searchText: string = "";
  selected_issues: IssueList[];

  constructor(private repoServiceSearch: RepoSearchService, private route: ActivatedRoute,
    private router: Router,) {             
      

  }

  getDetails(owner, id): void {
    this.repoServiceSearch.getDetails(owner, id).subscribe(res => {
  
      this.repo = res as Repo;
    });    
  }

  getIssues(filter): void {
    let id = this.route.snapshot.paramMap.get('id'),
        owner = this.route.snapshot.paramMap.get('owner');  

    this.repoServiceSearch.getIssues(owner, id, filter).subscribe(res => {
  
      this.issues = res as IssueList[];
    });
  }

  filterIssues(s) {    
    this.selected_issues = this.issues.filter(s => {
      return s.state;
    });
      
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id'),
        owner = this.route.snapshot.paramMap.get('owner');

    this.getDetails(owner, id);
    this.getIssues('all');

  }

}
