declare module '*.scss' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: any;
  export = value;
}
