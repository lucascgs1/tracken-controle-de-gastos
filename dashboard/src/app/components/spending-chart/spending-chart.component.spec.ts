import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpendingChartComponent } from './spending-chart.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SpendingChartComponent', () => {
	let component: SpendingChartComponent;
	let fixture: ComponentFixture<SpendingChartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SpendingChartComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SpendingChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return empty slices when data is empty', () => {
		fixture.componentRef.setInput('data', []);
		expect(component.slices()).toHaveLength(0);
	});

	it('should calculate correct slices for data', () => {
		const testData = [
			{ name: 'Food', value: 50 },
			{ name: 'Rent', value: 50 },
		];
		fixture.componentRef.setInput('data', testData);

		const slices = component.slices();
		expect(slices).toHaveLength(2);
		expect(slices[0].percent).toBe(50);
		expect(slices[1].percent).toBe(50);
		expect(slices[0].name).toBe('Food');
		expect(slices[1].name).toBe('Rent');
	});

	it('should handle largeArcFlag correctly for > 180 degrees', () => {
		const testData = [
			{ name: 'Large', value: 80 },
			{ name: 'Small', value: 20 },
		];
		fixture.componentRef.setInput('data', testData);

		const slices = component.slices();
		expect(slices[0].percent).toBe(80);
		// The path string should contain a '1' for the largeArcFlag
		expect(slices[0].path).toContain(' 1 ');
	});

	it('should cycle through colors', () => {
		const testData = new Array(10).fill({ name: 'Item', value: 10 });
		fixture.componentRef.setInput('data', testData);

		const slices = component.slices();
		expect(slices[0].color).toBe(component.colors[0]);
		expect(slices[6].color).toBe(component.colors[0]); // Colors length is 6
	});
});
