import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BannersModule } from '../../banners/banners.module';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsarticleComponent } from './newsarticle.component';

describe('NewsarticleComponent', () => {
  let component: NewsarticleComponent;
  let fixture: ComponentFixture<NewsarticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewsarticleComponent],
      imports: [RouterTestingModule.withRoutes([]), BannersModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
