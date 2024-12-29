import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadUsers, selectUser, addUser, updateUser, deleteUser } from '../store/actions';
import { User, AppState } from '../store/app.state';
import { selectAllUsers } from '../store/selectors';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]> | undefined;
  usersDataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.store.select(selectAllUsers);
    this.store.dispatch(loadUsers());
    this.users$.subscribe((users) => {
      this.usersDataSource.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  onSelectUser(userId: number) {
    this.store.dispatch(selectUser({ userId }));
  }

  onAddUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.store.dispatch(addUser({ user: result }));
      }
    });
  }

  onEditUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { mode: 'edit', user }
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.store.dispatch(updateUser({ user: result }));
      }
    });
  }

  onDeleteUser(user: User) {
    const message = `Are you sure you want to delete '${user.name}'?`;
    this.openConfirmDialog(message).subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(deleteUser({ userId: user.id })); // Use userId property
      }
    });
  }
  
  openConfirmDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Action', message }, // Use message directly
    });
  
    return dialogRef.afterClosed().pipe(
      map((result) => !!result) // Double negation for boolean conversion
    );
  }
}
