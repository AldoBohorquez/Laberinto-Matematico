import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProfesorComponent } from './login-profesor.component';

describe('LoginProfesorComponent', () => {
  let component: LoginProfesorComponent;
  let fixture: ComponentFixture<LoginProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
