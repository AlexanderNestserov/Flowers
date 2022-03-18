import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';

import { ContactsService } from './contacts.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlInterceptor } from 'src/environments/environment';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpinnerModule } from '../spinner/spinner.module';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, SpinnerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ContactsService,
        { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should inject ContactsService', () => {

    const componentService = fixture.debugElement.injector.get(ContactsService);
    componentService.getAdress();
    fixture.detectChanges();
    const nativeEl = fixture.debugElement.nativeElement;
    const text = nativeEl.querySelector('.container__street').textContent;
    expect(text).toEqual('some street city Minsk 44 ,11');
  });
});
