declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module "@metamask/jazzicon" {
    export default function (diameter: number, seed: number): HTMLElement;
}