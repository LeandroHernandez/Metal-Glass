import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  template: `
    <!-- <p>log-in works!</p> -->
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
            <h2>Ingreso de Administrador</h2>
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
              title="LogOut"
              [routerLink]="['/empleado/auth']"
            >
              Ir a Empleados
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      nz-row
      nzJustify="center"
      nzAlign="middle"
      class="nz-row-log-in-container"
    >
      <div nz-col class="nz-col-log-in-container">
        <nz-card nzTitle="Bienvenido" [nzExtra]="signUp" class="nz-card">
          <form
            nz-form
            [nzLayout]="'inline'"
            [formGroup]="signInForm"
            (ngSubmit)="submitForm()"
          >
            <div nz-row nzJustify="center" class="nz-row-content-form">
              <div nz-col class="nz-col-content-form col-username-input">
                <nz-form-item>
                  <nz-form-control
                    nzErrorTip="!Porfavor ingresa tu nombre de usuario¡"
                  >
                    <nz-input-group nzPrefixIcon="user">
                      <input
                        formControlName="username"
                        nz-input
                        placeholder="Nombre de Usuario"
                      />
                    </nz-input-group>
                  </nz-form-control>
                </nz-form-item>
              </div>
              <div nz-col class="nz-col-content-form col-password-input">
                <nz-form-item>
                  <nz-form-control
                    nzErrorTip="!Porfavor ingresa tu contraseña¡"
                  >
                    <nz-input-group nzPrefixIcon="lock">
                      <input
                        formControlName="password"
                        nz-input
                        type="password"
                        placeholder="Contraseña"
                      />
                    </nz-input-group>
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>
            <nz-form-item>
              <nz-form-control>
                <button
                  nz-button
                  nzType="primary"
                  [disabled]="!signInForm.valid"
                >
                  Ingresar
                </button>
              </nz-form-control>
            </nz-form-item>
          </form>
        </nz-card>
        <ng-template #signUp>
          <a [routerLink]="['/admin/auth/solicitud-de-registro']"
            >Registrarse</a
          >
        </ng-template>
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
      .nz-row-log-in-container {
        height: 80%;
        width: 100%;
      }

      .nz-card {
        width: 270px;
        min-width: 270px;
        border-radius: 7px;
        /* border-top-right-radius: 10px; */
        box-shadow: 7px 7px #1a334d;
      }

      .nz-col-content-form {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class LogInComponent implements OnInit {
  signInForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    console.log('submit', this.signInForm.value);
    if (this.signInForm.valid) {
      this._authSvc
        .signIn({
          username: this.signInForm.value.username,
          password: this.signInForm.value.password,
        })
        .subscribe(
          (accessToken) => {
            // console.log({ accessToken: accessToken });
            console.log(accessToken);
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            this._router.navigate(['user/home']);
          },
          (err) => console.log({ error: err })
        );
    }
  }
  constructor(
    private fb: FormBuilder,
    private _authSvc: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}
}
