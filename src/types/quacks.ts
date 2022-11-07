export interface IQuacksMenu {
  quacks: [];
}

export interface IQuack {
  name: string;
  username: string;
  quackedAt: string;
  content: string;
  replies: [];
  requacks: number;
  likes: number;
}

export interface IEmptyQuackMenu {
  quack?: boolean;
  requack?: boolean;
  likes?: boolean;
}
