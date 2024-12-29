import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, loadOrders } from './store/actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Load users and orders when the app starts
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadOrders());
  }
}
