import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from './user.state';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Geo {
  lat: string;
  lng: string;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUsers(pagination: Pagination) {
    return this.http.get<User[]>(buildUserUrl(pagination));
  }
}

function buildUserUrl(pagination: Pagination): string {
  const URL = 'https://jsonplaceholder.typicode.com/users';
  const currentPage = `_start=${pagination.currentPage}`;
  const pageSize = `_limit=${pagination.selectedSize}&`;

  return `${URL}?${pageSize}&${currentPage}`;
}
