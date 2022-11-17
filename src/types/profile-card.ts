export interface IProfileCard {
  loggedIn: boolean;
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: number | string;
  }[];
}
