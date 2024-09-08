import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCuentaPage } from './crear-cuenta.page';

describe('CrearCuentaPage', () => {
  let component: CrearCuentaPage;
  let fixture: ComponentFixture<CrearCuentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
