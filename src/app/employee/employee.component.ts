import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      hours: [''],
    });
    this.getAllEmployee();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.hours = this.formValue.value.hours;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee is added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('Something went Wrong');
      }
    );
  }
  getAllEmployee() {
    this.api.getEmployees().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee has been deleted successfully');
      this.getAllEmployee();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['hours'].setValue(row.hours);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.hours = this.formValue.value.hours;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Employee is updated successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }

}
