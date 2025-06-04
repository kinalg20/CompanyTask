import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from '../service/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(ApiService).canActivateSecurePages(route , state);
};