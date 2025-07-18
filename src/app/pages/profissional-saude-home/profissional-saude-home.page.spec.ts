import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfissionalSaudeHomePage } from './profissional-saude-home.page';

describe('ProfissionalSaudeHomePage', () => {
  let component: ProfissionalSaudeHomePage;
  let fixture: ComponentFixture<ProfissionalSaudeHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalSaudeHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
