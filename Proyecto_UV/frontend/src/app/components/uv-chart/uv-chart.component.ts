import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UvService } from '../services/uv.service';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-uv-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './uv-chart.component.html',
    styleUrls: ['./uv-chart.component.css']
})
export class UvChartComponent implements OnInit {
    chart: any;
    lastValue?: number;

    constructor(private uvService: UvService) {
        Chart.register(...registerables);
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.uvService.getUVData().subscribe((data: any[]) => { // <-- Tipo añadido
        if (data && data.length > 0) {
            this.lastValue = data[0].value;
            this.createChart(data);
        }
        });
    }

    createChart(data: any[]) {
        // Destruye el gráfico anterior si existe
        if (this.chart) {
        this.chart.destroy();
        }

        this.chart = new Chart('uvChart', {
        type: 'line',
        data: {
            labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
            datasets: [{
            label: 'Intensidad UV',
            data: data.map(d => d.value),
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
            tension: 0.4,
            fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y} mW/cm²`
                }
            }
            },
            scales: {
            y: {
                title: {
                display: true,
                text: 'mW/cm²'
                }
            }
            }
        }
        });
    }
}