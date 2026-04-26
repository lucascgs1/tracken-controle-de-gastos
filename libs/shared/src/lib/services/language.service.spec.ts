import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslocoService } from '@jsverse/transloco';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { of, Observable } from 'rxjs';

describe('LanguageService', () => {
	let service: LanguageService;
	let translocoServiceMock: {
		setActiveLang: Mock;
		getActiveLang: Mock;
		langChanges$: Observable<string>;
	};

	beforeEach(() => {
		const store: Record<string, string> = {};
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => (store[key] = value),
			clear: () => {
				for (const key in store) delete store[key];
			},
		});

		translocoServiceMock = {
			setActiveLang: vi.fn(),
			getActiveLang: vi.fn().mockReturnValue('en'),
			langChanges$: of('en'),
		};

		TestBed.configureTestingModule({
			providers: [LanguageService, { provide: TranslocoService, useValue: translocoServiceMock }],
		});
		service = TestBed.inject(LanguageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set language correctly', () => {
		service.setLanguage('pt');
		expect(translocoServiceMock.setActiveLang).toHaveBeenCalledWith('pt');
		expect(localStorage.getItem('tracken-lang')).toBe('pt');
	});

	it('should get active language', () => {
		translocoServiceMock.getActiveLang.mockReturnValue('pt');
		expect(service.getActiveLang()).toBe('pt');
	});
});
