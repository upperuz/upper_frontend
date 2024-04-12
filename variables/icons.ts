import * as icons from 'assets';
import { FC } from 'react';
import { IIconProps } from 'types';

export const ICONS = {
  delete: icons.DeleteIcon,
  home: icons.Home,
  user: icons.User,
  notification: icons.Notification,
  menuList: icons.MenuListIcon,
  pen: icons.Pen,
  search: icons.Search,
  eye: icons.EyeIcon,
  telegram: icons.Telegram,
  telegramColored: icons.TelegramColoredIcon,
  google: icons.GoogleIcon,
  facebook: icons.FacebookIcon,
  github: icons.GitHubIcon,
  comment: icons.Comment,
  like: icons.Like,
  dislike: icons.Dislike,
  share: icons.Share,
  next: icons.Next,
  prev: icons.Prev,
  instagram: icons.InstagramIcon,
  linkedIn: icons.LinkedIn,
  youtube: icons.YouTubeIcon,
  triangle: icons.TringleIcon,
  logOut: icons.LogOut,
  logo: icons.Logo,
  eyeSlash: icons.EyeSlashIcon,
  burger: icons.BurgerIcon,
  logoIcon: icons.LogoIcon,
  heart: icons.HeartIcon,
  addFolder: icons.AddFolderIcon,
  plus: icons.Plus,
  calendar: icons.CalendarIcon,
  help: icons.HelpIcon,
  website: icons.WebsiteIcon,
  send: icons.Send,
  openExternal: icons.OpenExternal,
  steps: icons.Steps,
  uploading: icons.Uploading,
  uploadError: icons.UploadError,
  uploadSuccess: icons.UploadSuccess,
  telegramChannel: icons.TelegramChannel,
  books: icons.Books,
  write: icons.Write,
  save: icons.Save,
  settings: icons.Settings,
  moon: icons.Moon,
  copy: icons.Copy,
  quoteUp: icons.QuoteUp,
  quoteDown: icons.QuoteDown,
} satisfies Record<string, FC<IIconProps>>;
