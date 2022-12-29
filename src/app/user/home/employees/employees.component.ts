import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IEmployee } from 'src/interfaces/employee.interface';
import { IUser } from 'src/interfaces/user.interface';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  public employees: IEmployee[] = [];
  public employeesView: IEmployee[] = [];
  // public employeesnamesView: string[] = [];
  public employeesnameView: string = '';
  // public employeesnamesView: Observable<Array<string>> = new Observable();
  public user: IUser | null = null;
  public listOfOption: Array<{ label: string; value: string }> = [];
  public listOfTagOptions = [];

  findEmployeeForm = this.fb.group({
    username: ['', [Validators.required]],
    remember: [true],
  });

  constructor(
    private _employeesSvc: EmployeesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getUser();
  }

  getEmployees(): void {
    this._employeesSvc.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
        this.employeesView = this.employees;
        // this.employees.forEach((employeesView, i) => {
        //   this.employeesnameView = `${employeesView.names} ${employeesView.surnames}`;
        // });
      },
      (err) => console.log({ error: err })
    );
    console.log({ employeesnamesView: this.employeesnameView });
  }

  getUser(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log({ accessToken: accessToken });
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      console.log({ accessTokenParse: accessTokenParse });
      this._employeesSvc.getUser(accessTokenParse.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (err) => console.log({ error: err })
      );
    }
  }

  // onChange(e: Event, nameInput: string): void {
  onChange(nameInput: string): void {
    // const value = (e.target as HTMLInputElement).value;
    console.log({
      employeesView: this.employeesView,
      nameInput: nameInput,
    });
    if (nameInput.length === 0) {
      this.employeesView = this.employees;
    }
  }

  // submitfindEmployeeForm(): void {
  submitfindEmployeeForm(formValue: string): void {
    this.employeesView = [];
    console.log({ formValue: formValue });
    // if (this.findEmployeeForm.valid) {
    if (formValue !== '' && formValue.length > 0) {
      // if (formValue) {
      console.log({ formValue: formValue });
      this.employeesView = [];
      this.employees.forEach((employee) => {
        // if (this.findEmployeeForm.value.username === employee.username) {
        if (formValue === employee.names + ' ' + employee.surnames) {
          this.employeesView.push(employee);
        }
      });
    } else {
      // if ((formValue = '')) {
      this.employeesView = this.employees;
    }
  }
}
