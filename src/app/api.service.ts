// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'https://localhost:7105/api/Movies';

  constructor(private http: HttpClient) { }

  // getMovies(): Observable<any> {
  //   return this.http.get<any>(this.BASE_URL).pipe(
  //     tap(response => console.log(response))
  //   );
  // }

  // getMovies(): Observable<any> {
  //   return this.http.get<any>(this.BASE_URL).pipe(
  //     tap(response => console.log(JSON.stringify(response)))
  //   );
  // }
  getMovies(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, movie);
  }

  editMovie(movie: any): Observable<any> {
    const url = `${this.BASE_URL}`;
    return this.http.put<any>(url, movie);
  }
  getMoviebyId(movieId: any): Observable<any> {
    const url = `${this.BASE_URL}/${movieId}`;
    return this.http.get<any>(url);
  }

  deleteMovie(movieId: any): Observable<any> {
    const url = `${this.BASE_URL}?id=${movieId}`;
    return this.http.delete<any>(url);
  }

  filterMovies(name: string, category: string): Observable<any> {
    const url = `${this.BASE_URL}?name=${name}&category=${category}`;
    return this.http.get<any>(url);
  }

  getMoviesByRating(): Observable<any> {
    const url = `${this.BASE_URL}/rating`;
    return this.http.get<any>(url);
  }

  getMoviesByRatingValue(rating: number): Observable<any> {
    const url = `${this.BASE_URL}/rating/${rating}`;
    return this.http.get<any>(url);
  }

  getMovieReport(): Observable<any> {
    const url = `${this.BASE_URL}/report`;
    return this.http.get<any>(url);
  }

  getAllCategoryNames(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + 'category/GetAllCategoryNames');
  }
}

