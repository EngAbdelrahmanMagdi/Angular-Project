import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, PieChartComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, NgApexchartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
