import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundfloePage } from './fundfloe.page';

describe('FundfloePage', () => {
  let component: FundfloePage;
  let fixture: ComponentFixture<FundfloePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FundfloePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
