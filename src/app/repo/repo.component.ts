import { Component, OnInit } from '@angular/core';
import { Repo } from "../models/repo";
import { IssueList } from "../models/issuelist";
import { ChartData } from "../models/chartdata";
import { RepoSearchService } from "../services/repo-search.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  openIssues: number = 0;
  closedIssues:number = 0;
 
  //Chart
  view: any[] = [800, 300];
  showLegend:boolean = true;
 
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels:boolean = true;
  explodeSlices:boolean = false;
  doughnut:boolean = false;
  chartHasData: boolean = false;
  chartData: ChartData[] = [];
  loading: boolean = true;

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
        owner = this.route.snapshot.paramMap.get('owner'),
        openIssues = 0,
        closedIssues = 0; 

    this.repoServiceSearch.getIssues(owner, id, filter).subscribe(res => {
  
      this.issues = res as IssueList[];

      for (let issue of this.issues) {
        if (issue.state == "open") {
          
          this.openIssues += 1;
        } else {
          this.closedIssues += 1;
        }
      }
      this.chartData.push({
        "name": "Open Issues",
        "value": this.openIssues
      });
      this.chartData.push({
        "name": "Closed Issues",
        "value": this.closedIssues
      });
      this.chartHasData = true;
      this.loading = false;
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