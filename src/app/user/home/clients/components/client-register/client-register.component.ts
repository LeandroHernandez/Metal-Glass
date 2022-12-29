import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { ClientsService } from '../../clients.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
})
export class ClientRegisterComponent implements OnInit {
  public documentTypes: ITypeDocument[] = [];
  public registerClientForm = this._fb.group({
    // documentTypeId: ['', [Validators.required]],
    documentTypeId: [null, [Validators.required]],
    // documentNumber: ['', [Validators.required]],
    documentNumber: [null, [Validators.required]],
    names: ['', [Validators.required]],
    surnames: ['', [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    email: ['', [Validators.required]],
    customerGrade: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientsSvc: ClientsService
  ) {}

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  registerClient(): void {
    console.log({ registerClientForm: this.registerClientForm.value });
    if (this.registerClientForm.valid) {
      console.log({ valideForm: true });
      const clientDTO = {
        ...this.registerClientForm.value,
        documentNumber: JSON.stringify(
          this.registerClientForm.value.documentNumber
        ),
        phoneNumber: JSON.stringify(this.registerClientForm.value.phoneNumber),
      };
      console.log({ clientDTO: clientDTO });
      this._clientsSvc.registerClient(clientDTO).subscribe(
        (client) => {
          console.log({ client: client });
          this._router.navigate(['admin/home/clientes']);
        },
        (err) => console.log({ error: err })
      );
    }
  }

  getDocumentTypes(): void {
    this._clientsSvc.getDocumentTypes().subscribe(
      (DocumentTypes) => {
        this.documentTypes = DocumentTypes;
      },
      (err) => console.log({ error: err })
    );
  }
}
