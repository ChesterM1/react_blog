declare module '*.scss' {
    const content: any;
    export default content;
  }

declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: any;
  
    export { ReactComponent };
    export default content;
  }
declare module '*.png' {
    const content: any;
    export default content;
  }