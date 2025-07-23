import { Component, inject, OnInit } from '@angular/core';
import { ThemeManagerService } from 'apps/SuperFitnessApp/src/app/core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from 'apps/SuperFitnessApp/src/app/core/services/TranslateManger/translate-manager-service.service';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/lib/auth-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }
  themeVal: boolean = false;
  langVal: boolean = false;
  fetchIsDone = false;

  private readonly _themeManager = inject(ThemeManagerService); 
  private readonly _translateManager = inject(TranslateManagerService);
  private readonly _authApiService = inject(AuthApiService);


  
  toggleTheme() {
    // this.themeVal = !this.themeVal;
    console.log(this.themeVal);
    this._themeManager.toggleTheme();
  }
  toggleLang() {
    // this.langVal = this.langVal == 'ar' ? 'en' : 'ar';
    console.log(`Language Now is :  ${this.langVal}`);
    this._translateManager.toggleLanguage();
  }

  getUserPrefFromCookies() {
    const theme = this._themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    if (theme == 'dark') {
      this.themeVal = true;
    }

    if (lang == 'ar') {
      this.langVal = true;
    }
  }

  ngOnInit(): void {
    this._themeManager.initTheme();
    this.getUserPrefFromCookies();
  }

}
