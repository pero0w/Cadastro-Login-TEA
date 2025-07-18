import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfissionalEducacionalHomePage } from './profissional-educacional-home.page';

describe('ProfissionalEducacionalHomePage', () => {
  let component: ProfissionalEducacionalHomePage;
  let fixture: ComponentFixture<ProfissionalEducacionalHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalEducacionalHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
