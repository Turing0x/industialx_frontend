import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.min.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  public myForm!: FormGroup;

  private validatorService = inject(ValidatorService);

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ]),
      subject: new FormControl(''),
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

    const { name, email, subject, messege } = this.myForm.value;

    console.log(name, email, subject, messege);
  }
}
