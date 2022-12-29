import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypesOfDocumentsService } from '../types-of-documents.service';

@Component({
  selector: 'app-type-of-document-register',
  templateUrl: './type-of-document-register.component.html',
  styleUrls: ['./type-of-document-register.component.css'],
})
export class TypeOfDocumentRegisterComponent implements OnInit {
  public registerTypeDocumentForm = this._fb.group({
    type: ['', [Validators.required]],
    description: [''],
  });

  constructor(
    private _fb: FormBuilder,
    private _typesDocumentsSvc: TypesOfDocumentsService
  ) {}

  ngOnInit(): void {}

  registerTypeDocument(): void {
    console.log({
      registerTypeDocumentForm: this.registerTypeDocumentForm.value,
    });
    if (this.registerTypeDocumentForm.valid) {
      this._typesDocumentsSvc
        .registerDocumentType(this.registerTypeDocumentForm.value)
        .subscribe(
          (typeDocument) => {
            console.log({ typeDocument: typeDocument });
          },
          (err) => console.log({ error: err })
        );
    }
  }
}
