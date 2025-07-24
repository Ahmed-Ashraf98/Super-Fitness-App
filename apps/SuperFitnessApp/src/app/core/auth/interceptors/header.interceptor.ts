import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateManagerService } from '../../services/TranslateManger/translate-manager-service.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);
  const trans:TranslateManagerService = inject(TranslateManagerService);


  // URLs اللي ما نضيفش فيها التوكن
  const excludedUrls = ['/auth/signup', '/auth/signin'];

  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const currentLang=trans.getCurrentLang();

  const currentToken = auth.getToken();

  if (currentToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentToken}`,
       "accept-language" : currentLang == 'ar' ? 'ar' : 'en' 
      },
    });
  }


  return next(req);
};
