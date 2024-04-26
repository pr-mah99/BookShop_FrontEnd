import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './View/login/login.component';
import { HttpClientModule } from '@angular/common/http';

// -----------Material
import { ThemeService } from './Services/Tools/ThemeService'; // قم بتعديل المسار حسب مكان الخدمة

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule  } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';


// import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// -------

// -------

import { HeaderComponent } from './Home/home/header/header.component';
import { FooterComponent } from './Home/home/footer/footer.component';
import { HomeComponent } from './Home/home/home.component';


import { ErrorComponent } from './View/error/error.component';
import { BooksComponent } from './View/Home/books/books.component';
import { OrderComponent } from './View/order/order.component';

import { AuthorsComponent } from './View/Home/authors/authors.component';
import { AdminComponent } from './View/admin/admin.component';
import { BooksManageComponent } from './View/admin/books-manage/books-manage.component';
import { OrdersManageComponent } from './View/admin/orders-manage/orders-manage.component';
import { EditBookComponent } from './View/admin/books-manage/edit-book/edit-book.component';
import { AddBookComponent } from './View/admin/books-manage/add-book/add-book.component';
import { DeleteBookComponent } from './View/admin/books-manage/delete-book/delete-book.component';
import { ConfirmationDialogComponent } from './Home/Dialogs/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    
    // -----------Pages

    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    BooksComponent,
    OrderComponent,
  
    AuthorsComponent,
    AdminComponent,
    BooksManageComponent,
    OrdersManageComponent,
    EditBookComponent,
    AddBookComponent,
    DeleteBookComponent,
    ConfirmationDialogComponent,

    // ----

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

        // -----------Material

        HttpClientModule,

        MatToolbarModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatTabsModule,
        MatSnackBarModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,

  ],
  providers: [
    ThemeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
