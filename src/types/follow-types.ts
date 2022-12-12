export interface IProfileFollowers {
  name: string;
  username: string;
}
export interface IProfileFollowing {
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
export interface IFollowingResponse {
  followingName: string;
  followingUsername: string;
  followingAvatar?: Buffer;
  followingTagline?: string;
  followingSince: Date;
}
