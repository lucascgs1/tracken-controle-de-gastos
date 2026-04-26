import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TrackenPageHeader, TrackenCard, TrackenSelect, TrackenButton, SelectOption } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-appearance-settings',
	templateUrl: './appearance.component.html',
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		TrackenPageHeader,
		TrackenCard,
		TrackenSelect,
		TrackenButton,
		TranslocoDirective,
	],
})
export class AppearanceSettingsComponent {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		theme: ['dark'],
		language: ['pt'],
	});

	themeOptions: SelectOption[] = [
		{ label: 'Light', value: 'light' },
		{ label: 'Dark', value: 'dark' },
		{ label: 'System', value: 'system' },
	];

	languageOptions: SelectOption[] = [
		{ label: 'Português', value: 'pt' },
		{ label: 'English', value: 'en' },
	];

	loading = signal(false);

	onSave() {
		if (this.form.valid) {
			this.loading.set(true);
			console.log('Saving appearance...', this.form.value);

			// Simulando um salvamento
			setTimeout(() => {
				this.loading.set(false);
				alert('Preferências salvas com sucesso!');
			}, 1000);
		}
	}
}
