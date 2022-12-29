import { Component, OnInit } from '@angular/core';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { TypesOfDocumentsService } from './types-of-documents.service';

@Component({
  selector: 'app-types-of-documents',
  templateUrl: './types-of-documents.component.html',
  styleUrls: ['./types-of-documents.component.css'],
})
export class TypesOfDocumentsComponent implements OnInit {
  public typesDocuments: ITypeDocument[] = [];

  constructor(private _typesDocumentsSvc: TypesOfDocumentsService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this._typesDocumentsSvc.getDocumentTypes().subscribe(
      (typesDocuments) => {
        this.typesDocuments = typesDocuments;
      },
      (err) => console.log({ error: err })
    );
  }
}
