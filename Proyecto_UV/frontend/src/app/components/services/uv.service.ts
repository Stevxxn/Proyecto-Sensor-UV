import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/uv'; // Cambia esto según tu configuración

@Injectable({
    providedIn: 'root'
})
export class UvService {
    private apiUrl = API_URL;

    constructor(private http: HttpClient) { }

    getUVData(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}