import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing-page.component.html',
  styleUrl: './billing-page.component.min.css',
})
export class BillingPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  public myForm!: FormGroup;

  private validatorService = inject(ValidatorService);

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      companyName: new FormControl('', []),
      country: new FormControl('', [Validators.required]),
      streetAdd: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ]),
      messege: new FormControl('', [Validators.required]),
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
      return;
    }
    console.log('Form working');

    const {
      fName,
      lName,
      companyName,
      country,
      streetAdd,
      town,
      province,
      zipCode,
      phone,
      email,
      messege,
    } = this.myForm.value;

    console.log(
      fName,
      lName,
      companyName,
      country,
      streetAdd,
      town,
      province,
      zipCode,
      phone,
      email,
      messege
    );
  }

  //TODO: product list from backend
}
