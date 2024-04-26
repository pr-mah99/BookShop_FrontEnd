import { Component } from '@angular/core';
import { Book } from '../../../../Model/Book';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../../../Provider/Book/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {

  book: Book = {
    title: '',
    author: '',
    genre: '',
    price: 0,
    availability: false
  };
  
  constructor(public bookService: BookService,
    private dialogRef: MatDialogRef<any, any>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Add the book using BookService
    this.bookService.addBook(this.book);
  }

  closeWindow(): void {
    // Close the dialog window using MatDialogRef
    this.dialogRef.close();
  }

}
