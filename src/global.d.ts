declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace JSX {
  interface IntrinsicElements {
    import: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
  }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt';
    [key: string]: any;
  };
}

declare interface IWindow {
  [method: string]: () => void
}

declare var wx: {
  [method: string]: () => void;
}

declare interface IPlainObject {
  [propName: string]: any
}

declare interface IBooleanObject {
  [propName: string]: boolean
}

declare interface IStringObject {
  [propName: string]: string
}

declare interface INumberObject {
  [propName: string]: number
}
