import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SystemUser } from '../interface/system-user.interface';

export const user_form_gruop = (fb: FormBuilder): FormGroup => {
  const validations: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(35),
  ];

  const dataForm: FormGroup = fb.group({
    username: [''],
    password: [''],
    role: [''],
    commercial_code: [''],

    ci: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    full_name: ['', validations],
    address: ['', validations],
    phone: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
  });

  return dataForm;
};

export function fillFormWithDataProd(dataForm: FormGroup, user: SystemUser) {
  dataForm.controls['username'].setValue(user.username);
  dataForm.controls['password'].setValue(user.password);
  dataForm.controls['role'].setValue(user.role);
  dataForm.controls['commercial_code'].setValue(user.commercial_code);
  dataForm.controls['ci'].setValue(user.personal_info.ci);
  dataForm.controls['full_name'].setValue(user.personal_info.full_name);
  dataForm.controls['address'].setValue(user.personal_info.address);
  dataForm.controls['phone'].setValue(user.personal_info.phone);
}
