import { TestBed } from '@angular/core/testing';
import { AppearanceSettingsComponent } from './appearance.component';
import { ToastService, provideTrackenTransloco } from '@tracken/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppearanceSettingsComponent', () => {
	let component: AppearanceSettingsComponent;
	let toastServiceMock: { success: Mock };

	beforeEach(async () => {
		toastServiceMock = { success: vi.fn() };

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, AppearanceSettingsComponent],
			providers: [
				{ provide: ToastService, useValue: toastServiceMock },
				provideTrackenTransloco(),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		}).compileComponents();

		const fixture = TestBed.createComponent(AppearanceSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default form values', () => {
		expect(component.form.value).toEqual({
			theme: 'dark',
			language: 'pt',
		});
	});

	it('should show success toast on save', () => {
		vi.useFakeTimers();
		component.onSave();

		expect(component.loading()).toBe(true);

		vi.advanceTimersByTime(1000);

		expect(component.loading()).toBe(false);
		expect(toastServiceMock.success).toHaveBeenCalled();

		vi.useRealTimers();
	});
});
