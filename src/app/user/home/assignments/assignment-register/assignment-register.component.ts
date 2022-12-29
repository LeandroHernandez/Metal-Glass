import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IEmployee } from 'src/interfaces/employee.interface';
import { IUser } from 'src/interfaces/user.interface';
import { AssignmentsService } from '../assignments.service';

@Component({
  selector: 'app-assignment-register',
  templateUrl: './assignment-register.component.html',
  styleUrls: ['./assignment-register.component.css'],
})
export class AssignmentRegisterComponent implements OnInit {
  public employeeId: string = '';
  public users: IUser[] = [];
  public adminsList: IUser[] = [];
  public employeesList: IEmployee[] = [];
  public user: IUser | null = null;

  public registerAssignmentForm = this._fb.group({
    theAssigned: ['', [Validators.required]],
    administratorsResponsibleForTheAssigned: [null],
    employeesResponsibleForTheAssigned: [null],
  });

  public selectedPhotos: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _assignmentsSvc: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.getEmployeeId();
    this.getUser();
    this.getUsers();
    this.getEmployees();
  }

  getEmployeeId(): void {
    const employeeId = this._route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeId = employeeId;
    }
  }

  getUser(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log({ accessToken: accessToken });
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      console.log({ accessTokenParse: accessTokenParse });
      this._assignmentsSvc.getUser(accessTokenParse.userId).subscribe(
        (user) => {
          this.user = user;
          console.log({ user: this.user });
        },
        (err) => console.log({ error: err })
      );
    }
  }

  getUsers(): void {
    console.log('first');
    this._assignmentsSvc.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log({ users: this.users });
        console.log({
          userFilter: this.users.filter((userI) => {
            return userI._id !== this.user?._id;
          }),
        });
        this.adminsList = this.users.filter((userI) => {
          return userI._id !== this.user?._id;
        });
      },
      (err) => console.log({ error: err })
    );
  }

  getEmployees(): void {
    this._assignmentsSvc.getEmployees().subscribe(
      (employees) => {
        this.employeesList = employees;
        console.log({ employees: this.employeesList });
      },
      (err) => console.log({ error: err })
    );
  }

  registerAssignment(): void {
    console.log({ valueForm: this.registerAssignmentForm.value });
    console.log({
      admindsIds:
        this.registerAssignmentForm.value
          .administratorsResponsibleForTheAssigned,
    });
    if (this.registerAssignmentForm.valid && this.user) {
      if (
        this.registerAssignmentForm.value
          .administratorsResponsibleForTheAssigned &&
        this.user &&
        !this.registerAssignmentForm.value.employeesResponsibleForTheAssigned
      ) {
        this._assignmentsSvc
          .registerAssignmentAndaddAdmins(this.user._id, {
            theAssigned: this.registerAssignmentForm.value.theAssigned,
            adminsIds:
              this.registerAssignmentForm.value
                .administratorsResponsibleForTheAssigned,
          })
          .subscribe(
            (assignment) => {
              console.log(assignment);
            },
            (err) => console.log({ error: err })
          );
      }
      if (
        this.registerAssignmentForm.value.employeesResponsibleForTheAssigned &&
        this.user &&
        !this.registerAssignmentForm.value
          .administratorsResponsibleForTheAssigned
      ) {
        this._assignmentsSvc
          .registerAssignmentAndaddEmployees(this.user._id, {
            theAssigned: this.registerAssignmentForm.value.theAssigned,
            employeesIds:
              this.registerAssignmentForm.value
                .employeesResponsibleForTheAssigned,
          })
          .subscribe(
            (assignment) => {
              console.log(assignment);
            },
            (err) => console.log({ error: err })
          );
      }
      if (
        this.registerAssignmentForm.value
          .administratorsResponsibleForTheAssigned &&
        this.user &&
        this.registerAssignmentForm.value.employeesResponsibleForTheAssigned
      ) {
        this._assignmentsSvc
          .registerAssignmentAndaddAdminsAndEmployees(this.user._id, {
            theAssigned: this.registerAssignmentForm.value.theAssigned,
            adminsIds:
              this.registerAssignmentForm.value
                .administratorsResponsibleForTheAssigned,
            employeesIds:
              this.registerAssignmentForm.value
                .employeesResponsibleForTheAssigned,
          })
          .subscribe(
            (assignment) => {
              console.log(assignment);
            },
            (err) => console.log({ error: err })
          );
      }
    }
  }
}
