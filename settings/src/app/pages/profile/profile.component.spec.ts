import { TestBed } from '@angular/core/testing';
import { ProfileSettingsComponent } from './profile.component';
import { AuthFacade } from '@tracken/data-access';
import { ToastService, provideTrackenTransloco } from '@tracken/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProfileSettingsComponent', () => {
	let component: ProfileSettingsComponent;
	let authFacadeMock: { user: any };
	let toastServiceMock: { show: Mock };

	beforeEach(async () => {
		authFacadeMock = {
			user: signal({ firstName: 'Lucas', lastName: 'Coutinho', email: 'test@test.com' }),
		};
		toastServiceMock = { show: vi.fn() };

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, ProfileSettingsComponent],
			providers: [
				{ provide: AuthFacade, useValue: authFacadeMock },
				{ provide: ToastService, useValue: toastServiceMock },
				provideTrackenTransloco(),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		}).compileComponents();

		const fixture = TestBed.createComponent(ProfileSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set dataLoaded after timeout', () => {
		vi.useFakeTimers();
		const fixture = TestBed.createComponent(ProfileSettingsComponent);
		fixture.detectChanges();

		expect(fixture.componentInstance.dataLoaded()).toBe(false);

		vi.advanceTimersByTime(800);
		expect(fixture.componentInstance.dataLoaded()).toBe(true);

		vi.useRealTimers();
	});

	it('should call toast success on save', () => {
		vi.useFakeTimers();
		component.onSave();

		vi.advanceTimersByTime(1000);

		expect(toastServiceMock.show).toHaveBeenCalledWith('settings.profileUpdated', 'success');
		vi.useRealTimers();
	});
});
