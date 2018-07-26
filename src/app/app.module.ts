import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RepoSearchService } from "./services/repo-search.service";
import { RepoComponent } from './repo/repo.component';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { 
    path: 'repo/:owner/:id',
    component: RepoComponent,
    data: {
      title: "Repo Info"
    } 
  }, 
  { path: '',
    component: SearchComponent,    
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RepoComponent,
    SearchComponent,
    FilterPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [RepoSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
