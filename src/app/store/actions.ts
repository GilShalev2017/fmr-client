import { createAction, props } from '@ngrx/store';
import { Order, User } from './app.state';

// User Actions
export const loadUsers = createAction('[User API] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: User[] }>());
export const selectUser = createAction('[User] Select User', props<{ userId: number | null }>());
export const addUser = createAction('[User API] Add User', props<{ user: User }>());
export const updateUser = createAction('[User API] Update User', props<{ user: User }>());
export const deleteUser = createAction('[User API] Delete User', props<{ userId: number }>());
// Order Actions
export const loadOrders = createAction('[Order API] Load Orders'); 
export const loadOrdersSuccess = createAction('[Order API] Load Orders Success', props<{ orders: Order[] }>());
