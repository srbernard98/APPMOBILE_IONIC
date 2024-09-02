import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeModalPage } from './welcome-modal.page';

describe('WelcomeModalPage', () => {
  let component: WelcomeModalPage;
  let fixture: ComponentFixture<WelcomeModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
