import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, selectUser, loadOrdersSuccess, addUser, deleteUser, updateUser } from './actions';
import { AppState, User } from './app.state';

// Initial States
const initialUsersState: AppState['users'] = {
  entities: {},
  selectedUserId: null,
};
const initialOrdersState: AppState['orders'] = {
  entities: {},
};
// Users Reducer
export const usersReducer = createReducer(
  initialUsersState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    entities: users.reduce((entities, user) => ({ ...entities, [user.id]: user }), {}),
  })),
  on(selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),
  // on(addUser, (state, { user }) => ({
  //   ...state,
  //   entities: { ...state.entities, [user.id]: user },
  // })),
  on(addUser, (state, { user }) => {
    const newId = getNextId(state.entities);
    const newUser = { ...user, id: newId }; 
    return {
      ...state,
      entities: { ...state.entities, [newId]: newUser },
    };
  }),
  on(updateUser, (state, { user }) => ({
    ...state,
    entities: { ...state.entities, [user.id]: user },
  })),
  on(deleteUser, (state, { userId }) => {
    const { [userId]: removed, ...entities } = state.entities;
    return { ...state, entities };
  })
);
// Orders Reducer
export const ordersReducer = createReducer(
  initialOrdersState,
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    entities: orders.reduce((entities, order) => ({ ...entities, [order.id]: order }), {}),
  }))
);

function getNextId(entities: { [id: number]: User }): number {
  const userIds = Object.keys(entities).map(id => parseInt(id, 10));
  // Get the maximum ID and increment by 1
  return Math.max(...userIds, 0) + 1; // Get the maximum ID and increment by 1
}