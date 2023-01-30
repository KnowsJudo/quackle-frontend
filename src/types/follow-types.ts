export interface IProfileFollow {
  name: string;
  username: string;
}
export interface IFollowingData {
  username: string;
  followingName: string;
  followingUsername: string;
  followingAvatar?: string;
  followingTagline?: string;
}

export interface IFollowerData {
  followerName: string;
  followerUsername: string;
  followerAvatar?: string;
  followerTagline?: string;
}
export interface IFollowingResponse extends IFollowingData {
  _id: string;
  followingSince: Date;
}
export interface IFollowerResponse extends IFollowerData {
  _id: string;
  followerSince: Date;
}
