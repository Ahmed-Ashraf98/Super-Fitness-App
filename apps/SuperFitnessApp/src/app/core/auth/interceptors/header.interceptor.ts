import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateManagerService } from '../../services/TranslateManger/translate-manager-service.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const trans = inject(TranslateManagerService);

  const excludedUrls = ['/signup', '/signin'];
  const isExcluded = excludedUrls.some(url => req.url.endsWith(url));

  if (isExcluded) {
    return next(req);
  }

  const currentLang = trans.getCurrentLang();


  const currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (currentToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentToken}`,
        'accept-language': currentLang === 'ar' ? 'ar' : 'en',
      },
    });
  }


  return next(req);
};
