import { Customer } from "./Customer";


export interface TokenDto {
  accessToken: string;
  login: string;
  refreshToken: string;
  role: string;
  user: Customer;
  
}
