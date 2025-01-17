// /// <reference types="vite-plugin-svgr/client" />

// declare module "*.svg" {
//     import React from "react";
//     const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//     export default ReactComponent;
//   }




  /// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
    import * as React from "react";
    
    // 1) A named export for the React component
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    
    // 2) The default export is the file path (string)
    const src: string;
    export default src;
  }