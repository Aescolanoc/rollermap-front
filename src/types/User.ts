export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: Array<any>;
  myrollerplaces: Array<any>;
}
