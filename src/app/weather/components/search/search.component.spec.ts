import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form group', () => {
    spyOn(component, 'initFormGroup');
    component.ngOnInit();
    expect(component.initFormGroup).toHaveBeenCalled();
  });

  it('form should be invalid if search is empty', () => {
    component.initFormGroup();
    component.searchForm.get('cityControl').patchValue('');
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should emit an event when searching a city ', () => {
    component.searchForm.get('cityControl').setValue('London');
    spyOn(component.search, 'emit');
    component.onSubmit();
    expect(component.search.emit).toHaveBeenCalledWith('London');
  });

  it('should not emit any event if empty', () => {
    component.searchForm.get('cityControl').setValue('');
    spyOn(component.search, 'emit');
    component.onSubmit();
    expect(component.search.emit).not.toHaveBeenCalled();
  })

  it('should have a valid city value if submitted', () => {
    component.searchForm.get('cityControl').setValue('London');
    expect(component.searchForm.get('cityControl').value).toBeTruthy();
  });
});
