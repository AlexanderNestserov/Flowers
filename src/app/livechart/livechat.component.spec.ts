import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { LiveChatComponent } from './livechat.component';

describe('LiveChatComponent', () => {
  let component: LiveChatComponent;
  let fixture: ComponentFixture<LiveChatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LiveChatComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created chartShow', () => {
    component.isChartShow = false;
    component.chartShow();
    expect(component.isChartShow).toBe(true);
  });
  it('should be created closeChart', () => {
    component.isChartShow = true;
    component.closeChart();
    expect(component.isChartShow).toBe(false);
  });
});
