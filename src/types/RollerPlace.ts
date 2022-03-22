export default interface RollerPlace {
  _id: string;
  name: string;
  description: string;
  location: Array<number>;
  type: string;
  slalom: boolean;
  city: string;
  image: string;
  level: string;
  author: string;
}
