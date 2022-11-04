export interface IProfileCard {
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: number | string;
  }[];
}
