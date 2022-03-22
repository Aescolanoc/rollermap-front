import type RollerPlace from "./RollerPlace";

export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: Array<RollerPlace>;
  myrollerplaces: Array<RollerPlace>;
}
