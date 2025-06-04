import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('ApiService', () => {
  let service: ApiService;
  const mockSnackBar = { open: jasmine.createSpy('open') };
  const mockRouter = { navigate: jasmine.createSpy('navigate') };
  const mockTranslate = { instant: jasmine.createSpy('instant') };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: mockTranslate }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
