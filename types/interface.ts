export type TypeT = (query: string) => any

export interface I18n {
  t: TypeT;
  initialLanguage?: string;
}

export interface AnyProps {
  [propsName: string]: any;
}
