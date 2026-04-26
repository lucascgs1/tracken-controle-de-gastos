import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackenButton, TrackenDropdown, LanguageService, Language } from '@tracken/shared';
import { AuthFacade } from '@tracken/data-access';
import { AsyncPipe } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  imports: [RouterModule, TrackenButton, TrackenDropdown, AsyncPipe, TranslocoDirective],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private authFacade = inject(AuthFacade);
  public langService = inject(LanguageService);
  
  user$ = this.authFacade.user$;
  isDarkMode = signal(false);

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  setLanguage(lang: Language) {
    this.langService.setLanguage(lang);
  }

  onLogout() {
    this.authFacade.logout();
  }
}
