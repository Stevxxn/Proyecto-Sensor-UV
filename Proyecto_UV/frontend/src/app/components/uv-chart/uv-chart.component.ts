import { Component, OnInit } from '@angular/core';
import { UvService } from '../services/uv.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-uv-chart',
  templateUrl: './uv-chart.component.html',
  styleUrls: ['./uv-chart.component.css']
})
export class UvChartComponent implements OnInit {
  // Declara todas las propiedades que usas en el template
  uvData: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  chart: any;

  constructor(private uvService: UvService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.uvService.getUVData().subscribe({
      next: (data) => {
        this.uvData = data;
        this.loading = false;
        this.createChart();
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('uvChart', {
      type: 'line',
      data: {
        labels: this.uvData.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [{
          label: 'Intensidad UV (mW/cm²)',
          data: this.uvData.map(d => d.value),
          borderColor: '#36A2EB',
          backgroundColor: '#9BD0F5',
          tension: 0.4
        }]
      }
    });
  }
}