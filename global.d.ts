// Temporary global JSX declarations to satisfy TypeScript when React types are missing.
// Prefer installing `@types/react` and `@types/react-dom` as a proper fix.
declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {
    // minimal Element type
    type: any;
    props: any;
  }
  interface ElementClass {
    // minimal ElementClass type
    render?: any;
  }
}

// Allow importing image assets (SVG, PNG, JPG) without explicit types
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.jpeg' {
  const content: string;
  export default content;
}

// Vite special modules
declare module '/vite.svg' {
  const content: string;
  export default content;
}
