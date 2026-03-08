import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetData {
  private http = inject(HttpClient);




  private readonly API_URL = 'https://dragonball-api.com/api/characters';



  constructor() {
    console.log('ApiService inicializado');
  }

  /**
   * Manejador de errores genérico
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en la petición HTTP:', error);

    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }


  getAllItems(): Observable<any> {



    return this.http.get(`${this.API_URL}`).pipe(


      map((response: any) => {

        return response;
      }),
      catchError(this.handleError)
    );
  }


  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map((response: any) => {
        console.log('Respuesta de la API:', response);

      }
      ),
      catchError(this.handleError)
    );
  }

}
