export interface IProfileFollowers {
  name: string;
  username: string;
  fromMenu?: boolean;
}

export interface IFollowerResponse {
  followerName: string;
  followerUsername: string;
  followerAvatar?: Buffer;
  followerTagline?: string;
  followerSince: Date;
}
