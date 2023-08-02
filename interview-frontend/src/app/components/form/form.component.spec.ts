import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormService } from './form.service';
import {FormBuilder, FormControl, FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs/internal/observable/of';

import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async ()=>{

    const formServiceSpy = jasmine.createSpyObj<FormService>(['getSearchResult']);
    const formSpy = jasmine.createSpyObj<FormBuilder>(['group']);

    const onlyAnyLettersPattern = '^[a-zA-Za-zA-ZäöüÄÖÜß ]*$';

    let myForm: FormGroup;

    myForm = formSpy.group({
      searchString: ['', [Validators.required, Validators.pattern(onlyAnyLettersPattern)]],
    });

    formServiceSpy.getSearchResult.and.callFake(function () {
      return of({
        "uuid": "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f",
        "cityName": "Berlin",
        "count": 523
      });
    });

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        MatInputModule,
        MatPaginatorModule,
        NgIf,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: FormService,
          useValue: formServiceSpy
        }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
