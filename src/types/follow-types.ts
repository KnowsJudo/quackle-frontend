export interface IProfileFollowers {
  name: string;
  username: string;
}
export interface IProfileFollowing {
  name: string;
  username: string;
}

export interface IFollowerResponse {
  _id: string;
  followerName: string;
  followerUsername: string;
  followerAvatar?: Buffer;
  followerTagline?: string;
  followerSince: Date;
}
export interface IFollowingResponse {
  _id: string;
  followingName: string;
  followingUsername: string;
  followingAvatar?: Buffer;
  followingTagline?: string;
  followingSince: Date;
}
