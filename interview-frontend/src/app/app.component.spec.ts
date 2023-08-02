import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from './components/form/form.component';
import { FormService } from './components/form/form.service';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      MatInputModule,
      MatPaginatorModule,
      NgIf,
    ],
    declarations: [
      AppComponent,
      FormComponent
    ],
    providers: [
      {
        provide: FormService,
        useValue: formServiceSpy
      }
    ]

  }));
  const formServiceSpy = jasmine.createSpyObj<FormService>;

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Cities Search'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cities Search');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container h1')?.textContent).toContain('Search for a city');
  });
});
