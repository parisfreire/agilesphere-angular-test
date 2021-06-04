import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { WeatherState } from '../../store/reducers/weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Input() error: string;
  @Output() search = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor() { }

  public initFormGroup(): void {
    this.searchForm = new FormGroup({
      cityControl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.initFormGroup();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value.cityControl);
    }
  }
}
