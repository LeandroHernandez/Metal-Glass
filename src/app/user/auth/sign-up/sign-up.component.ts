import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  template: `
    <!-- <p>
      sign-up works!
    </p> --><!-- <p>employee-register works!</p> -->
    <div
      nz-row
      nzAlign="middle"
      [nzGutter]="[0, 0]"
      nzJustify="space-between"
      class="header"
    >
      <div
        nz-col
        nzSpan="4"
        nzXXl="4"
        nzXl="4"
        nzLg="5"
        nzMd="7"
        nzSm="9"
        nzXs="24"
      >
        <img
          [src]="
            'https://firebasestorage.googleapis.com/v0/b/audio-visual-turno.appspot.com/o/MetalGlassLogo.jpeg?alt=media&token=354bf13d-f55c-46ef-bd7e-117c673fc4a2'
          "
          [alt]="'Logo de Metal Glass'"
          title="Logo de Metal Glass"
          class="metalGlassLogo"
        />
      </div>
      <div
        nz-col
        nzSpan="20"
        nzXXl="20"
        nzXl="20"
        nzLg="19"
        nzMd="17"
        nzSm="15"
        nzXs="24"
      >
        <div
          nz-row
          nzAlign="middle"
          [nzGutter]="[0, 0]"
          nzJustify="space-around"
        >
          <div
            nz-col
            nzSpan="18"
            nzXXl="18"
            nzXl="18"
            nzLg="16"
            nzMd="24"
            nzSm="24"
            nzXs="24"
          >
            <h2>Rigistrar Administrador</h2>
          </div>
          <div
            nz-col
            nzSpan="4"
            nzXXl="4"
            nzXl="4"
            nzLg="6"
            nzMd="24"
            nzSm="24"
            nzXs="24"
          >
            <button
              nz-button
              nzType="primary"
              nzSize="large"
              title="Back"
              [routerLink]="['/admin/auth/ingresar']"
            >
              Volver a Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      nz-row
      nzAlign="middle"
      [nzGutter]="[0, 0]"
      nzJustify="center"
      class="content-row"
    >
      <div nz-col nzSpan="22" class="content-col">
        <!-- <nz-card [nzTitle]="headerCard"> -->
        <form
          nz-form
          [formGroup]="registerAdminForm"
          (ngSubmit)="registerEmployee()"
        >
          <!-- <nz-divider
          nzText="Datos de registro"
          nzOrientation="left"
        ></nz-divider> -->
          <div
            nz-row
            nzAlign="top"
            [nzGutter]="[0.0]"
            nzJustify="space-between"
          >
            <div nz-col nzSpan="11" class="nz-col col-1">
              <nz-form-item>
                <nz-form-label nzSpan="24"
                  >Tipo de documento de documento</nz-form-label
                >
                <nz-form-control
                  nzErrorTip="!Porfavor ingresa tu tipo de documento¡"
                >
                  <nz-select
                    formControlName="documentType"
                    nzPlaceHolder="Mi tipo de documento"
                  >
                    <nz-option
                      *ngFor="let documentType of documentTypes"
                      [nzValue]="documentType._id"
                      [nzLabel]="documentType.type"
                    ></nz-option>
                  </nz-select>
                  <ng-template #selectIcon>
                    <span nz-icon nzType="select" nzTheme="outline"></span>
                  </ng-template>
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24">Numero de documento</nz-form-label>
                <nz-form-control
                  nzHasFeedback
                  nzErrorTip="El numero de documento es requerido"
                >
                  <input
                    nz-input
                    formControlName="documentNumber"
                    placeholder="Numero de documento"
                  />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24">Nombres del empleado</nz-form-label>
                <nz-form-control
                  nzHasFeedback
                  nzErrorTip="Los del empleado son requeridos"
                >
                  <input
                    nz-input
                    formControlName="names"
                    placeholder="Nombres"
                  />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24"
                  >Apellidos del empleado</nz-form-label
                >
                <nz-form-control
                  nzHasFeedback
                  nzErrorTip="Los apellidos del empleado son requeridos "
                >
                  <input
                    nz-input
                    formControlName="surnames"
                    placeholder="Apellidos"
                  />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24">Numero de telefono</nz-form-label>
                <nz-form-control
                  nzHasFeedback
                  nzErrorTip="El numero de telefono es requerido"
                >
                  <input
                    nz-input
                    type="number"
                    formControlName="phoneNumber"
                    placeholder="Numero de telefono"
                  />
                </nz-form-control>
              </nz-form-item>
            </div>
            <div nz-col nzSpan="11" class="nz-col col-2">
              <nz-form-item>
                <nz-form-label nzSpan="24">Correo del empleado</nz-form-label>
                <nz-form-control nzHasFeedback>
                  <input
                    nz-input
                    formControlName="email"
                    placeholder="Correo"
                  />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24">Nombre de usuario</nz-form-label>
                <nz-form-control nzHasFeedback>
                  <input
                    nz-input
                    formControlName="username"
                    placeholder="Nombre de usario"
                  />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzSpan="24">Contraseña</nz-form-label>
                <nz-form-control nzHasFeedback>
                  <input
                    nz-input
                    formControlName="password"
                    placeholder="Contraseña"
                  />
                </nz-form-control>
              </nz-form-item>
            </div>
          </div>
          <nz-form-item>
            <!-- <nz-form-label nzSpan="24">Fotos de empleado</nz-form-label> -->
            <nz-form-control nzHasFeedback>
              <!-- <input type="file" formControlName="photos" placeholder="fotos" /> -->
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                multiple
                placeholder="upload files"
                id="uploadFiles"
                (change)="selectedPhotosEvent($event)"
              />
              <label for="uploadFiles" class="labelInputUploadFiles">
                Subir fotos del empleado
              </label>
            </nz-form-control>
          </nz-form-item>
          <button nz-button type="submit" nzType="primary">Registrar</button>
        </form>

        <!-- <ng-template #headerCard> <h1>Registrar empleado</h1></ng-template> -->
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        /* background: #1a334d; */
        background: #171e52;
        margin-bottom: 20px;
        padding: 10px 0;
      }

      .header [nz-col] {
        justify-content: center;
        text-align: center;
      }

      .header [nz-col] button {
        width: 180px;
      }

      .header h2 {
        color: #ffffffff;
        margin: 0;
        justify-content: center;
        text-align: center;
        font-size: 30px;
      }

      .metalGlassLogo {
        /* width: 100%; */
        width: 200px;
        height: 80px;
      }

      /* .col-2 {
    border-left: solid 1px rgb(194, 194, 194);
} */

      #uploadFiles {
        display: none;
      }

      .labelInputUploadFiles {
        background: #171e52;
        border-radius: 3px;
        color: #ffffffff;
        padding: 10px;
      }

      .labelInputUploadFiles:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 0 rgb(196, 196, 196);
      }
    `,
  ],
})
export class SignUpComponent implements OnInit {
  public registrationRequestaccessToken: string | null = null;
  public documentTypes: ITypeDocument[] = [];
  public registerAdminForm = this._fb.group({
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
    private _authSvc: AuthService
  ) {
    // const registrationRequestaccessToken = localStorage.getItem(
    //   'registrationRequestaccessToken'
    // );
    // if (registrationRequestaccessToken) {
    //   this.registrationRequestaccessToken = JSON.parse(
    //     registrationRequestaccessToken
    //   );
    // } else {
    //   this._router.navigate(['admin/auth/solicitud-de-registro']);
    // }
  }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  registerEmployee(): void {
    this.uploadFiles();
  }

  getDocumentTypes(): void {
    this._authSvc.getDocumentTypes().subscribe(
      (documentTypes) => {
        console.log({ documentTypes: documentTypes });
        this.documentTypes = documentTypes;
      },
      (err) => console.log({ error: err })
    );
  }
  selectedPhotosEvent(event: any) {
    this.selectedPhotos = event.target.files;
    console.log({ selectedPhotos: this.selectedPhotos });
  }

  uploadFiles() {
    if (this.registerAdminForm.valid) {
      const adminDTO = {
        // documentTypeId: this.registerAdminForm.value.documentTypeId,
        documentTypeId: this.registerAdminForm.value.documentType,
        documentNumber: this.registerAdminForm.value.documentNumber,
        names: this.registerAdminForm.value.names,
        surnames: this.registerAdminForm.value.surnames,
        phoneNumber: JSON.stringify(this.registerAdminForm.value.phoneNumber),
        email: this.registerAdminForm.value.email,
        username: this.registerAdminForm.value.username,
        password: this.registerAdminForm.value.password,
        // photos: this.registerProductForm.value.photos,
      };
      this._authSvc.signUp(adminDTO).subscribe(
        (admin) => {
          for (let i = 0; i < this.selectedPhotos.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(this.selectedPhotos[i]);
            reader.onloadend = () => {
              this._authSvc
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
                  this._authSvc.registerPhoto(photoDTO).subscribe(
                    (photo) => {
                      console.log({ photo: photo });
                      this._authSvc
                        .addPhotoToAdmin(admin._id, photo._id)
                        .subscribe(
                          (adminPostAddPhoto) => {
                            this._router.navigate(['admin/auth/ingresar']);
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
}
