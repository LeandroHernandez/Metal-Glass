import { Component, OnInit } from '@angular/core';
import { IAssignment } from 'src/interfaces/assignment.interface';
import { IUser } from 'src/interfaces/user.interface';
import { AssignmentsService } from './assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  public assignments: Array<IAssignment> = [];
  public assignmentsView: Array<IAssignment> = [];
  public searchValue = '';
  public visible = false;
  public allChecked = false;
  public indeterminate = true;
  public administratorsWhoAssignsListView: Array<{
    label: string;
    value: string;
    checked: boolean;
  }> = [];
  public users: IUser[] = [];
  public user: IUser | null = null;
  constructor(private _assignmentsSvc: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
    this.getUsers();
  }

  getUsers(): void {
    console.log('first');
    this._assignmentsSvc.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.users.forEach((user) => {
          if (user && user._id) {
            this.administratorsWhoAssignsListView.push({
              label: user.names + ' ' + user.surnames,
              value: user._id,
              checked: true,
            });
          }
        });
      },
      (err) => console.log({ error: err })
    );
  }

  getAssignments(): void {
    this._assignmentsSvc.getAssignments().subscribe(
      (assignments) => {
        this.assignments = assignments;
        this.assignmentsView = this.assignments;
        // this.assignmentsView.forEach((assignmentView) => {
        //   if (
        //     assignmentView.administratorWhoAssigns &&
        //     assignmentView.administratorWhoAssigns._id
        //   ) {
        //     this.administratorsWhoAssignsListView.push({
        //       label:
        //         assignmentView.administratorWhoAssigns.names +
        //         ' ' +
        //         assignmentView.administratorWhoAssigns.surnames,
        //       value: assignmentView.administratorWhoAssigns._id,
        //       checked: true,
        //     });
        //   }
        //
      },
      (err) => console.log({ error: err })
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    console.log({
      administratorsWhoAssignsListView: this.administratorsWhoAssignsListView,
    });

    if (this.administratorsWhoAssignsListView.length > 0) {
      this.assignmentsView = [];
      this.assignments.forEach((assignment) => {
        this.administratorsWhoAssignsListView.forEach(
          (administratorsWhoAssignView) => {
            console.log({
              administratorsWhoAssignView: administratorsWhoAssignView,
            });
            if (
              assignment.administratorWhoAssigns &&
              administratorsWhoAssignView.checked === true &&
              assignment.administratorWhoAssigns._id ===
                administratorsWhoAssignView.value
            ) {
              console.log('hola');
              this.assignmentsView.push(assignment);
            }
          }
        );
      });
    } else {
      this.assignmentsView = this.assignments;
    }
    console.log({ assignmentsView: this.assignmentsView });
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.administratorsWhoAssignsListView =
        this.administratorsWhoAssignsListView.map((item) => ({
          ...item,
          checked: true,
        }));
    } else {
      this.administratorsWhoAssignsListView =
        this.administratorsWhoAssignsListView.map((item) => ({
          ...item,
          checked: false,
        }));
    }
  }

  updateSingleChecked(): void {
    if (this.administratorsWhoAssignsListView.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (
      this.administratorsWhoAssignsListView.every((item) => item.checked)
    ) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
