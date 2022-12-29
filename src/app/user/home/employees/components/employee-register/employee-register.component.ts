import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { IUser } from 'src/interfaces/user.interface';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css'],
})
export class EmployeeRegisterComponent implements OnInit {
  public documentTypes: ITypeDocument[] = [];
  public employeeId: string = '';
  public user: IUser | null = null;
  public registerEmployeeForm = this._fb.group({
    // documentTypeId: ['', [Validators.required]],
    documentType: [null, [Validators.required]],
    documentNumber: ['', [Validators.required]],
    names: ['', [Validators.required]],
    surnames: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    photos: [['']],
    remember: [true],
  });

  public selectedPhotos: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _employeesSvc: EmployeesService
  ) {}

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getEmployeeId();
    this.getUser();
  }

  registerEmployee(): void {
    this.uploadFiles();
  }

  getDocumentTypes(): void {
    this._employeesSvc.getDocumentTypes().subscribe(
      (documentTypes) => {
        console.log({ documentTypes: documentTypes });
        this.documentTypes = documentTypes;
      },
      (err) => console.log({ error: err })
    );
  }

  getEmployeeId(): void {
    const employeeId = this._route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeId = employeeId;
    }
  }

  selectedPhotosEvent(event: any) {
    this.selectedPhotos = event.target.files;
    console.log({ selectedPhotos: this.selectedPhotos });
  }

  uploadFiles() {
    if (this.registerEmployeeForm.valid) {
      const employeeDTO = {
        // documentTypeId: this.registerEmployeeForm.value.documentTypeId,
        documentTypeId: this.registerEmployeeForm.value.documentType,
        documentNumber: this.registerEmployeeForm.value.documentNumber,
        names: this.registerEmployeeForm.value.names,
        surnames: this.registerEmployeeForm.value.surnames,
        phoneNumber: JSON.stringify(
          this.registerEmployeeForm.value.phoneNumber
        ),
        email: this.registerEmployeeForm.value.email,
        username: this.registerEmployeeForm.value.username,
        password: this.registerEmployeeForm.value.password,
        // photos: this.registerProductForm.value.photos,
      };
      this._employeesSvc.registerEmployee(employeeDTO).subscribe(
        (employee) => {
          for (let i = 0; i < this.selectedPhotos.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(this.selectedPhotos[i]);
            reader.onloadend = () => {
              this._employeesSvc
                .uploadFile(
                  Date.now() + '_' + this.selectedPhotos[i].name,
                  reader.result
                )
                .then((photoUrl) => {
                  console.log({ photoUrl: photoUrl });
                  const photoDTO = {
                    name: this.selectedPhotos[i].name,
                    photoPath: photoUrl,
                  };
                  this._employeesSvc.registerPhoto(photoDTO).subscribe(
                    (photo) => {
                      console.log({ photo: photo });
                      this._employeesSvc
                        .addPhotoToEmployee(employee._id, photo._id)
                        .subscribe(
                          (employeePostAddPhoto) => {
                            this._router.navigate(['admin/home/empleados']);
                          },
                          (err) => console.log({ error: err })
                        );
                    },
                    (err) => console.log({ error: err })
                  );
                });
            };
          }
        },
        (err) => console.log({ error: err })
      );
    }
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
}
