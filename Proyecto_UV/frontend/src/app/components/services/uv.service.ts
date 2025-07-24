import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UVData {
    value: number;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UvService {
    private apiUrl = 'http://localhost:3000/api/uv';

    constructor(private http: HttpClient) { }

    getUVData(): Observable<UVData[]> {
        return this.http.get<UVData[]>(this.apiUrl);
    }

    addUVData(value: number): Observable<any> {
        return this.http.post(this.apiUrl, { value });
    }
}