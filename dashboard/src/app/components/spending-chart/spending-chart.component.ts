import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-spending-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './spending-chart.component.html',
	styleUrl: './spending-chart.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingChartComponent {
	data = input<{ name: string; value: number }[]>([]);

	colors = ['#8b5cf6', '#2dd4bf', '#38bdf8', '#f472b6', '#fbbf24', '#a78bfa'];

	slices = computed(() => {
		const total = this.data().reduce((acc, curr) => acc + curr.value, 0);
		if (total === 0) return [];

		let cumulativeAngle = 0;

		return this.data().map((item, index) => {
			const angle = (item.value / total) * 360;
			const startAngle = cumulativeAngle;
			const endAngle = cumulativeAngle + angle;
			cumulativeAngle += angle;

			const x1 = 50 + 45 * Math.cos((Math.PI * (startAngle - 90)) / 180);
			const y1 = 50 + 45 * Math.sin((Math.PI * (startAngle - 90)) / 180);
			const x2 = 50 + 45 * Math.cos((Math.PI * (endAngle - 90)) / 180);
			const y2 = 50 + 45 * Math.sin((Math.PI * (endAngle - 90)) / 180);

			const largeArcFlag = angle > 180 ? 1 : 0;
			const path = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

			return {
				...item,
				path,
				color: this.colors[index % this.colors.length],
				percent: Math.round((item.value / total) * 100),
			};
		});
	});
}
