export interface User {
  id: number;
  username: string;
  password: string;
  nome: string;
  cognome: string;
  email: string;
  roles: [
    {id: number,
    roleName: string}
  ]
}
