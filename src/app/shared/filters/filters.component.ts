import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
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
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private productM = inject(ProductManagerService);

  private filtersService = inject(FiltersService);

  dataForm: FormGroup = filters_form_gruop(this.fb);
  ngAfterViewInit(): void {
    const name = document.getElementById('name') as HTMLInputElement;
    this.filtersService.filters$.subscribe((filters) => {
      if (filters.name) {
        name.value = filters.name;
      }
    });

    name.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.productM.filterProducts(name.value);
      }
    });
  }

  applyFilters() {
    const name = document.getElementById('name') as HTMLInputElement;

    if (!name) return;
    this.productM.filterProducts(name.value);
  }

  resetFilters() {
    this.productM.resetFilters();
  }

  orderList() {
    const select = document.getElementById('order') as HTMLSelectElement;
    if (select.value !== 'nothing') this.productM.sortProducts(select.value);
  }
}
