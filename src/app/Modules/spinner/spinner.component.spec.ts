import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('SpinnerComponent', () => {
  let service: SpinnerService;
  let httpMock: HttpTestingController;
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SpinnerService]
    })
      .compileComponents();
    service = TestBed.inject(SpinnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

