export interface IQuackInput {
  fixed: boolean;
  setInitiateQuack?: React.Dispatch<React.SetStateAction<boolean>> | null;
  targeted?: string;
  avatar?: string;
  parentQuackId?: string;
  parentUsername?: string;
}

export interface IQuackResponse {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  content: string;
  quackedAt: string;
  atUsers: string[];
  likes: string[];
  replies: IQuackOutput[];
}
export interface IQuackOutput {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  content: string;
  quackedAt: string;
  atUsers: string[];
  replies: IQuackOutput[];
  likes: string[];
  deleteQuack?: (quackId: string) => void;
  loading: boolean;
  loggedIn: boolean;
}
