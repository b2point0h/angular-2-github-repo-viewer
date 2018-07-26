import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from '../app.component';
import { RepoComponent } from '../repo/repo.component';
import { SearchComponent } from '../search/search.component';
import { FilterPipe } from '../filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartModule } from 'angular2-highcharts';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AppComponent,
        RepoComponent,
        SearchComponent,
        FilterPipe
       ],
      imports: [
        BrowserModule,
        HttpModule,      
        RouterTestingModule,
        ChartModule,
        FormsModule
      ],  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
