import { Component, OnInit } from '@angular/core';
import { Repo } from "../models/repo";
import { IssueList } from "../models/issuelist";
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
  showLegend:boolean = true;
 
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels:boolean = true;
  explodeSlices:boolean = false;
  doughnut:boolean = false;
  chartHasData: boolean = false;
  chartOptions = {};
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
      this.chartHasData = true;
      this.loading = false;

      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title : { text : 'Repo Issues' },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y}',                  
              }
          }
        },
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical'
        },
        series: [{
            name: "Issues",
            colorByPoint: true,
            data: [{
              name: "Open Issues",
              y: this.openIssues
            }, {
              name: "Closed Issues",
              y: this.closedIssues
            }],
        }],
        responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              }
          }]
        }
      };
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