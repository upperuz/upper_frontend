import { HTMLAttributes } from 'react';

export type TAlertColor = 'red' | 'outline-red' | 'yellow' | 'green';

export interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: TAlertColor;
  onClose?: VoidFunction;
  show?: boolean;
}

export interface IAlert {
  message: string;
  color: TAlertColor;
}
