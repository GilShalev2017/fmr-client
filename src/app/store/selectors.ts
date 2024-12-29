import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

// Feature Selectors
export const selectUsersState = createFeatureSelector<AppState['users']>('users');

export const selectOrdersState = createFeatureSelector<AppState['orders']>('orders');

// Users Selectors
export const selectAllUsers = createSelector(selectUsersState, (state) => Object.values(state.entities));

export const selectSelectedUserId = createSelector(selectUsersState, (state) => state.selectedUserId);

export const selectSelectedUser = createSelector(
  selectUsersState,
  selectSelectedUserId,
  (usersState, userId) => (userId !== null ? usersState.entities[userId] : null)
);

// Orders Selectors
export const selectOrdersByUser = createSelector(
  selectOrdersState,
  selectSelectedUserId,
  (ordersState, userId) => userId !== null ? Object.values(ordersState.entities).filter(order => order.userId === userId) : []
);

export const selectTotalOrderSum = createSelector(selectOrdersByUser, (orders) =>
  orders.reduce((sum, order) => sum + order.total, 0)
);
