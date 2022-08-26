import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  employeeData!: any;
  chartSeries = [];
  element!:any;
  chartLabels = [];
  
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: false,
    },
  };
  
  
  chartTitle: ApexTitleSubtitle = {
    text: `Employee's Working Hours`,
    align: 'center',
  };
  
  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllEmployeeNames();
    this.getAllEmployeeHours();
    this.getAllEmployee();
  }

  getAllEmployeeHours():any {
    this.api.getEmployees().subscribe((res) => {
      this.employeeData = res;
      this.chartSeries = this.employeeData.map((element:any) => {
        return element.hours;
      });
    });
  }

  getAllEmployeeNames():any {
    this.api.getEmployees().subscribe((res) => {
      this.employeeData = res;
      this.chartLabels = this.employeeData.map((element:any) => {
        return element.name;
      });
    });
  }
  getAllEmployee() {
    this.api.getEmployees().subscribe((res) => {
      this.employeeData = res;
    });
  }
}
