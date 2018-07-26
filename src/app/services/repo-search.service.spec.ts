import { TestBed, inject } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RepoSearchService } from "../services/repo-search.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoSearchService],
      imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],  
    });
  });

  it('should be created', inject([RepoSearchService], (service: RepoSearchService) => {
    expect(service).toBeTruthy();
  }));
});
