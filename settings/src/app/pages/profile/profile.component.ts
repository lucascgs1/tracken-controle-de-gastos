import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
	TrackenPageHeader,
	TrackenCard,
	TrackenInput,
	TrackenButton,
	TrackenSkeleton,
	TrackenAnimateDirective,
	ToastService,
} from '@tracken/shared';
import { AuthFacade } from '@tracken/data-access';
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
		TrackenSkeleton,
		TrackenAnimateDirective,
		TranslocoDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
	private fb = inject(NonNullableFormBuilder);
	private authFacade = inject(AuthFacade);
	private toast = inject(ToastService);

	// Uso do Signal direto da Facade
	user = this.authFacade.user;
	dataLoaded = signal(false);

	constructor() {
		// Simula carregamento inicial de dados
		setTimeout(() => this.dataLoaded.set(true), 800);
	}

	form = this.fb.group({
		firstName: ['Lucas', [Validators.required]],
		lastName: ['Coutinho', [Validators.required]],
		email: [
			{ value: 'usuario@email.com', disabled: true },
			[Validators.required, Validators.email],
		],
	});

	loading = signal(false);

	onSave() {
		if (this.form.valid) {
			this.loading.set(true);

			// Simulação de salvamento com feedback premium
			setTimeout(() => {
				this.loading.set(false);
				this.toast.show('settings.profileUpdated', 'success');
			}, 1000);
		}
	}
}
