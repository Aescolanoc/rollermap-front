export default interface RollerPlace {
  _id?: string;
  name: string;
  description: string;
  location: Array<number>;
  trace: Array<any>;
  type: string;
  slalom: boolean;
  city: string;
  image: string;
  level: string;
  author: string;
}
