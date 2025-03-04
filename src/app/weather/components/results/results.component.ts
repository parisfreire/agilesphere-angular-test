import { Component, Input } from '@angular/core';

import { Weather } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {

  @Input() weatherList: Weather[];
  @Input() isLoading: boolean;

  constructor() { }

}




