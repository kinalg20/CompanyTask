import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../service/permission.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivateSecurePages();
};

export const alreadyLoggedIn: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivateAuthPages();
};
