export interface IQuacksMenu {
  quacks: [];
}

export interface IQuackInput {
  fixed: boolean;
  displayPic: string;
  atUser?: string;
  content: string;
}
export interface IQuackOutput {
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
