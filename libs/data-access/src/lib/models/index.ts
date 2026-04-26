export interface Category {
	id?: string;
	name: string;
	icon: string;
	color: string;
	type: 'income' | 'expense';
}

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	date: string;
	category: string;
	type: 'income' | 'expense';
	userId: string;
}

export interface Budget {
	id?: string;
	categoryId: string;
	categoryName: string;
	limit: number;
	spent: number;
	period: string; // e.g. '2026-04'
}
