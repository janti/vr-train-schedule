import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ContainerComponent } from './container/container.component';
import { SearchComponent } from './shared/components/search/search.component';
import { TrainTableComponent } from './shared/components/train-table/train-table.component';
import {
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatCardModule,
  MatTabsModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    SearchComponent,
    TrainTableComponent,

  ],
  imports: [
    BrowserModule,
    [MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, MatAutocompleteModule,  MatCardModule,
      MatTabsModule],
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
