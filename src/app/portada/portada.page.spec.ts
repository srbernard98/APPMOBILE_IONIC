import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortadaPage } from './portada.page';

describe('PortadaPage', () => {
  let component: PortadaPage;
  let fixture: ComponentFixture<PortadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
