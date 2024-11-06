// filters.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private filters = new BehaviorSubject<{ name?: string }>({});

  get filters$() {
    return this.filters.asObservable();
  }

  updateFilters(newFilters: { name?: string }) {
    this.filters.next(newFilters);
  }

}