import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TrackenPageHeader, TrackenCard, TrackenInput, TrackenButton } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-profile-settings',
	templateUrl: './profile.component.html',
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		TrackenPageHeader,
		TrackenCard,
		TrackenInput,
		TrackenButton,
		TranslocoDirective,
	],
})
export class ProfileSettingsComponent {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		firstName: ['Lucas', Validators.required],
		lastName: ['Coutinho', Validators.required],
		email: [
			{ value: 'usuario@email.com', disabled: true },
			[Validators.required, Validators.email],
		],
	});

	loading = signal(false);

	onSave() {
		if (this.form.valid) {
			this.loading.set(true);
			console.log('Saving profile...', this.form.getRawValue());

			setTimeout(() => {
				this.loading.set(false);
				alert('Perfil atualizado com sucesso!');
			}, 1000);
		}
	}
}
