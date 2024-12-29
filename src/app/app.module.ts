import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { SelectedUserComponent } from './selected-user/selected-user.component';
import { UsersComponent } from './users/users.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppEffects } from './store/effects';
import { usersReducer, ordersReducer } from './store/reducers';
import { UserService } from './store/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SelectedUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,

    StoreModule.forRoot(
      {
        users: usersReducer,
        orders: ordersReducer,
      },
    ),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent], // Bootstrap your AppComponent
})
export class AppModule {}
