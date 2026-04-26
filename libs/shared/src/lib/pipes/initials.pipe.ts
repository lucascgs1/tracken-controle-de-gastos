import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'initials',
	standalone: true,
})
export class InitialsPipe implements PipeTransform {
	transform(value: string | null | undefined): string {
		if (!value) return '?';

		// Se for email, pega a primeira letra antes do @
		if (value.includes('@')) {
			return value.charAt(0).toUpperCase();
		}

		// Se for nome, pega a primeira letra de cada palavra (máximo 2)
		const parts = value.trim().split(/\s+/);
		if (parts.length === 1) {
			return parts[0].substring(0, 2).toUpperCase();
		}

		return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
	}
}
