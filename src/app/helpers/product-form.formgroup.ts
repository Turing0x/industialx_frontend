import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Environments } from '../environment/env';
import { Product } from '../interface/product.interface';

export const product_form_gruop = (fb: FormBuilder): FormGroup => {
  const validations: ValidatorFn[] = [
    Validators.required,
    Validators.min(1),
    Validators.max(50000),
  ];
  const validations1: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ];

  const dataForm: FormGroup = fb.group({
    name: ['', validations1],
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    owner: [''],
    category: [null],
    price: ['', validations],
    photo: ['', Validators.pattern(Environments.urlPattern)],
  });

  return dataForm;
};

export function fillFormWithDataProd(dataForm: FormGroup, product: Product) {
  dataForm.controls['name'].setValue(product.name);
  dataForm.controls['description'].setValue(product.description);
  // dataForm.controls['owner'].setValue(product.owner);
  // dataForm.controls['category'].setValue(product.category.name);
  // dataForm.controls['photo'].setValue(product.photo);
  dataForm.controls['price'].setValue(product.price);
}
