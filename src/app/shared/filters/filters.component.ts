import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FiltersService } from '../../services/filters.service';
import { filters_form_gruop } from '../../helpers/filters-form.formgroup';

@Component({
  selector: 'product-filters',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.min.css',
})
export class FiltersComponent {
  private platform = inject(PLATFORM_ID);

  private fb = inject(FormBuilder);
  private productM = inject(ProductManagerService);

  private filtersService = inject(FiltersService);

  dataForm: FormGroup = filters_form_gruop(this.fb);
  applyFilters() {
    if (isPlatformBrowser(this.platform)) {
      const name = document.getElementById('name') as HTMLInputElement;

      if (!name) return;
      this.productM.filterProducts(name.value);
    }
  }

  resetFilters() {
    this.productM.resetFilters();
  }

  orderList() {
    if (isPlatformBrowser(this.platform)) {
      const select = document.getElementById('order') as HTMLSelectElement;
      if (select.value !== 'nothing') this.productM.sortProducts(select.value);
    }
  }
}
