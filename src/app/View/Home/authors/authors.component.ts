import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/Network/HttpClient';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit{

  constructor(
    public dataService: DataService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  data: any = [];
  loading = false;

  getData() {
    this.loading = true;

    this.dataService.getData(`api/authors-with-book-count`).subscribe({
      next: (response) => {
        // console.log(response);      
        this.data = response;
      },
      error: (error) => {        
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

}
