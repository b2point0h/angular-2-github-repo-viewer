import { TestBed, inject } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RepoSearchService } from "../services/repo-search.service";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoSearchService],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],  
    });
  });

  it('should be created', inject([RepoSearchService], (service: RepoSearchService) => {
    expect(service).toBeTruthy();
  }));
});
