import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { UvService } from '../services/uv.service';
import { Observable, of } from 'rxjs';

interface UVData {
    value: number;
    timestamp: Date;
    _id?: string;
}

@Component({
    selector: 'app-uv-table',
    standalone: true, // <-- Importante para Angular 17+
    imports: [CommonModule, DecimalPipe, DatePipe], // <-- Añade esto
    templateUrl: './uv-table.component.html',
    styleUrls: ['./uv-table.component.css']
})
export class UvTableComponent implements OnInit {
    uvData: UVData[] = [];
    displayedColumns: string[] = ['position', 'value', 'timestamp'];
    isLoading = true;

    constructor(private uvService: UvService) {}

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.uvService.getUVData().subscribe({
        next: (data: UVData[]) => { // <-- Tipo explícito
            this.uvData = data;
            this.isLoading = false;
        },
        error: (err) => {
            console.error('Error loading UV data:', err);
            this.isLoading = false;
        }
        });
    }

    getAlertClass(value: number): string {
        if (value > 10) return 'danger';
        if (value > 5) return 'warning';
        return 'safe';
    }
}