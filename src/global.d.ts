// import SCSS as object
declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}