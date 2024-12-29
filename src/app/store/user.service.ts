import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, Order } from './app.state';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private mockUsers: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'David Smith' },
    { id: 4, name: 'Sarah Jones' },
    { id: 5, name: 'Michael Brown' },
    { id: 6, name: 'Emily Davis' },
    { id: 7, name: 'Christopher Martinez' },
    { id: 8, name: 'Daniel Wilson' },
    { id: 9, name: 'Jennifer Garcia' },
    { id: 10, name: 'Robert Martinez' },
  ];

  private mockOrders: Order[] = [
    { id: 1, userId: 1, total: 100 },
    { id: 2, userId: 1, total: 50 },
    { id: 3, userId: 2, total: 200 },
    { id: 4, userId: 2, total: 150 },
    { id: 5, userId: 3, total: 80 },
    { id: 6, userId: 3, total: 120 },
    { id: 7, userId: 4, total: 500 },
    { id: 8, userId: 4, total: 250 },
    { id: 9, userId: 5, total: 100 },
    { id: 10, userId: 5, total: 150 },
    { id: 11, userId: 6, total: 300 },
    { id: 12, userId: 6, total: 200 },
    { id: 13, userId: 7, total: 400 },
    { id: 14, userId: 7, total: 100 },
    { id: 15, userId: 8, total: 150 },
    { id: 16, userId: 8, total: 250 },
    { id: 17, userId: 9, total: 50 },
    { id: 18, userId: 9, total: 100 },
    { id: 19, userId: 10, total: 200 },
    { id: 20, userId: 10, total: 300 },
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getOrders(): Observable<Order[]> {
    //TODO add timeout to demonstrate long calls
    return of(this.mockOrders);
  }
}
