export interface IProfileFollowers {
  name: string;
  username: string;
}

export interface IFollowerResponse {
  followerName: string;
  followerUsername: string;
  followerAvatar?: Buffer;
  followerTagline?: string;
  followerSince: Date;
}
