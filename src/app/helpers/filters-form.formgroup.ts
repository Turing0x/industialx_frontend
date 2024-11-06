import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filters } from '../interface/filters.interface';

export const filters_form_gruop = (fb: FormBuilder): FormGroup => {
  const dataForm: FormGroup = fb.group({
    name: [''],
    minPrice: [Validators.min(0)],
    maxPrice: [Validators.min(0)],
  });

  return dataForm;
};

export function fillFormWithDataFilters(dataForm: FormGroup, filters: Filters) {
  dataForm.controls['name'].setValue(filters.name);
  dataForm.controls['minPrice'].setValue(filters.minPrice);
  dataForm.controls['maxPrice'].setValue(filters.maxPrice);
}
