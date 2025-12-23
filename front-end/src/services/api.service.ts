import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Measurement } from "../models/measurement.interface";
import { BoardCard, BoardCardCreate } from "../models/board-card.interface";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {}

    public getAllMeasurements(): Observable<Measurement[]> {
        return this.httpClient.get<Measurement[]>('http://localhost:8000/measurement');
    }

    public addMeasurement(measurement: Measurement): Observable<Measurement> {
        return this.httpClient.post<Measurement>('http://localhost:8000/measurement', measurement);
    }

    public getAllBoardCards(): Observable<BoardCard[]> {
        return this.httpClient.get<BoardCard[]>('http://localhost:8000/board-card');
    }

    public addBoardCard(boardCard: BoardCardCreate): Observable<BoardCard> {
        return this.httpClient.post<BoardCard>('http://localhost:8000/board-card', boardCard);
    }

    public updateBoardCard(boardCard: BoardCard): Observable<BoardCard> {
        return this.httpClient.put<BoardCard>('http://localhost:8000/board-card', boardCard);
    }
}