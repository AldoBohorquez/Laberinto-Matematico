import { TestBed } from '@angular/core/testing';

import { AlumnosAutenticacionService } from './alumnos-autenticacion.service';

describe('AlumnosAutenticacionService', () => {
  let service: AlumnosAutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosAutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
