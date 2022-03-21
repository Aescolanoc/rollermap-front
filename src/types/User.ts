export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites?: Array<string>;
  myrollerplaces?: Array<string>;
}
