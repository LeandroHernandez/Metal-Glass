import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css'],
})
export class ProductRegisterComponent implements OnInit {
  public registerProductForm = this._fb.group({
    productName: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required]],
    discount: [0, [Validators.required]],
    amount: [0, [Validators.required]],
    photos: [['']],
    remember: [true],
  });

  public selectedPhotos: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _productsSvc: ProductsService
  ) {}

  ngOnInit(): void {}

  registerProduct(): void {
    this.uploadFiles();
  }

  selectedPhotosEvent(event: any) {
    this.selectedPhotos = event.target.files;
    console.log({ selectedPhotos: this.selectedPhotos });
  }

  uploadFiles() {
    if (this.registerProductForm.valid) {
      const productDTO = {
        productName: this.registerProductForm.value.productName,
        description: this.registerProductForm.value.description,
        price: this.registerProductForm.value.price,
        discount: this.registerProductForm.value.discount,
        amount: this.registerProductForm.value.amount,
      };
      console.log({ productDTO: productDTO });
      this._productsSvc.registerProduct(productDTO).subscribe(
        (product) => {
          for (let i = 0; i < this.selectedPhotos.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(this.selectedPhotos[i]);
            reader.onloadend = () => {
              this._productsSvc
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
                  this._productsSvc.registerPhoto(photoDTO).subscribe(
                    (photo) => {
                      console.log({ photo: photo });
                      this._productsSvc
                        .addPhotoToProduct(product._id, photo._id)
                        .subscribe(
                          (productPostAddPhoto) => {
                            this._router.navigate(['admin/home/productos']);
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
