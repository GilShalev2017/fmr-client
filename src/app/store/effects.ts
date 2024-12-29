import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersSuccess, loadOrders, loadOrdersSuccess } from './actions';
import { map, switchMap, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AppEffects {
  
  loadUsers$: any;
  loadOrders$: any;

  constructor(private actions$: Actions, private userService: UserService) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() => this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users }))
        ))
      )
    );
    this.loadOrders$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadOrders),
        switchMap(() => this.userService.getOrders().pipe(
          map(orders => loadOrdersSuccess({ orders }))
        ))
      )
    );
  }
}
