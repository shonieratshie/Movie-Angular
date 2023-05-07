import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  movieId: any;
  constructor() {}

  setViewMoviesId(id: any) {
    this.movieId = id;
  }

  getViewMoviesId() {
    return this.movieId;
  }
}