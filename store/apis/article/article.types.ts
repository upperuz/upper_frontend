import { OutputBlockData } from '@editorjs/editorjs';
import { ILabel } from 'types';

export interface ICreateArticleDto {
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}
export interface IUpdateArticleDto {
  id: number;
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}
