import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewuserPage } from './newuser.page';

describe('NewuserPage', () => {
  let component: NewuserPage;
  let fixture: ComponentFixture<NewuserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
