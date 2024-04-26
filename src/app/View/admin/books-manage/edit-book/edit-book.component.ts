import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../../Model/Book';
import { BookService } from '../../../../Provider/Book/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent  {

  book: Book;

  constructor(private bookService: BookService,
    private dialogRef: MatDialogRef<any, any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.book = data.book;
               }


  onSubmit(): void {
    // Update the book using BookService
    this.bookService.updateBook(this.book);
  }

  closeWindow(): void {
    // Close the dialog window using MatDialogRef
    this.dialogRef.close();
  }

}
