import {
  CommentIcon,
  DeleteIcon,
  DislikeIcon,
  EyeIcon,
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  HomeIcon,
  InstagramIcon,
  LikeIcon,
  LinkedInIcon,
  Logo,
  LogOutIcon,
  MenuListIcon,
  NextIcon,
  NotificationIcon,
  PenIcon,
  PrevIcon,
  SaveIcon,
  SearchIcon,
  ShareIcon,
  TelegramIcon,
  TringleIcon,
  UserIcon,
  YouTubeIcon,
} from 'assets';
import { TIcon, TIconComponent } from 'types';

export const ICON_TYPES = {
  delete: 'delete',
  save: 'save',
  home: 'gome',
  user: 'user',
  notification: 'notification',
  menuList: 'menuList',
  pen: 'pen',
  search: 'search',
  eye: 'eye',
  telegram: 'telegram',
  google: 'google',
  facebook: 'facebook',
  github: 'github',
  comment: 'comment',
  like: 'like',
  dislike: 'dislike',
  share: 'share',
  next: 'next',
  prev: 'prev',
  instagram: 'instagram',
  linkedIn: 'linkedIn',
  youtube: 'youtube',
  triangle: 'triangle',
  logOut: 'logOut',
  logo: 'logo',
};

export const SOCIAL_MEDIA_ICONS = [
  ICON_TYPES.telegram,
  ICON_TYPES.facebook,
  ICON_TYPES.github,
  ICON_TYPES.linkedIn,
  ICON_TYPES.youtube,
  ICON_TYPES.instagram,
];

export const ICONS: Record<TIcon, TIconComponent> = {
  delete: DeleteIcon,
  save: SaveIcon,
  home: HomeIcon,
  user: UserIcon,
  notification: NotificationIcon,
  menuList: MenuListIcon,
  pen: PenIcon,
  search: SearchIcon,
  eye: EyeIcon,
  telegram: TelegramIcon,
  google: GoogleIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
  comment: CommentIcon,
  like: LikeIcon,
  dislike: DislikeIcon,
  share: ShareIcon,
  next: NextIcon,
  prev: PrevIcon,
  instagram: InstagramIcon,
  linkedIn: LinkedInIcon,
  youtube: YouTubeIcon,
  triangle: TringleIcon,
  logOut: LogOutIcon,
  logo: Logo,
};
