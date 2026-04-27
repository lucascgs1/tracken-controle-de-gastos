import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthFacade, FirebaseService } from '@tracken/data-access';
import { provideTrackenTransloco, ThemeService, LanguageService } from '@tracken/shared';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('App', () => {
	let authFacadeMock: any;
	let firebaseServiceMock: any;
	let themeService: ThemeService;
	let langService: LanguageService;
	let fixture: ComponentFixture<App>;

	beforeEach(async () => {
		authFacadeMock = {
			user: signal(null),
			user$: of(null),
			loading$: of(false),
			error$: of(null),
			logout: vi.fn(),
		};

		firebaseServiceMock = {
			user$: of(null),
			login: vi.fn(),
			logout: vi.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, App],
			providers: [
				provideMockStore({}),
				provideHttpClient(),
				provideHttpClientTesting(),
				provideTrackenTransloco(),
				{ provide: AuthFacade, useValue: authFacadeMock },
				{ provide: FirebaseService, useValue: firebaseServiceMock },
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
		}).compileComponents();

		themeService = TestBed.inject(ThemeService);
		langService = TestBed.inject(LanguageService);
		fixture = TestBed.createComponent(App);
		fixture.detectChanges();
	});

	afterEach(() => {
		document.documentElement.removeAttribute('lang');
	});

	it('should create the app', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should toggle theme', () => {
		const spy = vi.spyOn(themeService, 'toggleTheme');
		fixture.componentInstance.toggleTheme();
		expect(spy).toHaveBeenCalled();
	});

	it('should set language', () => {
		const spy = vi.spyOn(langService, 'setLanguage');
		fixture.componentInstance.setLanguage('pt');
		expect(spy).toHaveBeenCalledWith('pt');
	});

	it('should call logout on facade', () => {
		fixture.componentInstance.onLogout();
		expect(authFacadeMock.logout).toHaveBeenCalled();
	});

	it('should update lang attribute on html tag when language changes', async () => {
		langService.setLanguage('pt');
		fixture.detectChanges();
		await fixture.whenStable();

		expect(document.documentElement.getAttribute('lang')).toBe('pt');

		langService.setLanguage('en');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(document.documentElement.getAttribute('lang')).toBe('en');
	});
});
