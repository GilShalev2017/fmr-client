import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, AppState } from '../store/app.state';
import { selectSelectedUser, selectTotalOrderSum } from '../store/selectors';

@Component({
  selector: 'app-selected-user',
  standalone: false,
  templateUrl: './selected-user.component.html',
  styleUrl: './selected-user.component.css'
})
export class SelectedUserComponent implements OnInit {

  selectedUser$: Observable<User | null> | undefined;
  totalOrderSum$: Observable<number> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.selectedUser$ = this.store.select(selectSelectedUser);

    this.totalOrderSum$ = this.store.select(selectTotalOrderSum);
  }
}
