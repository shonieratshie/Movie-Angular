import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit {
  movies: any[] = [];

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      (response) => {
        this.movies = response;
      },
      (error) => {
        console.log(error);
      }
    );
    throw new Error('Method not implemented.');
  }

  constructor(private apiService: ApiService) {}
  
  generateCSVFile(): void {
    const csvData = this.convertToCSV(this.movies);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'movies.csv');
  }
  

  convertToCSV(movies: any[]): string {
    const headers = ['Name', 'Rating', 'Category'];
    const csvRows = [];
    csvRows.push(headers);
    movies.forEach((movie) => {
      const row = [movie.name, movie.rating, movie.category];
      csvRows.push(row);
    });
    return csvRows.map(row => row.join(',')).join('\n');
  }

}
