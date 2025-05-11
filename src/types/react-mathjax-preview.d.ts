declare module 'react-mathjax-preview' {
  import { FC } from 'react';
  
  interface MathJaxProps {
    math: string;
    className?: string;
  }
  
  const MathJax: FC<MathJaxProps>;
  export default MathJax;
} 