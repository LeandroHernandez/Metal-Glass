import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/interfaces/employee.interface';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
})
export class EmployeeViewComponent implements OnInit {
  public employee: IEmployee | null = null;

  constructor(
    private _employeesSvc: EmployeesService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const employeeId = this._route.snapshot.paramMap.get('id');
    if (employeeId) {
      this._employeesSvc.getEmployee(employeeId).subscribe(
        (employee) => {
          this.employee = employee;
        },
        (err) => console.log({ error: err })
      );
    }
  }
}
