import { AxiosRequestHeaders } from 'axios';

export interface UriEndPoint {
  uri: string;
  method: string;
  version: string;
  headerProps?: AxiosRequestHeaders;
  host?: string;
}
export interface User {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
