import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && window.sessionStorage) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      return router.parseUrl('/');
    }

    return true;
  }


  return true;
};
