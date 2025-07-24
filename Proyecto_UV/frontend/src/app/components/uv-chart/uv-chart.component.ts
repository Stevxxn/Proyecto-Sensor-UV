import { Component, OnInit } from '@angular/core';
import { UvService } from '../../services/uv.service';
import { Chart } from 'chart.js/auto'; // Importación optimizada

@Component({
    selector: 'app-uv-chart',
    templateUrl: './uv-chart.component.html',
    styleUrls: ['./uv-chart.component.css']
})
export class UvChartComponent implements OnInit {
    public chart: any;

    constructor(private uvService: UvService) {}

    ngOnInit() {
        this.uvService.getUVData().subscribe(data => {
        this.createChart(data);
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