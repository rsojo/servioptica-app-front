import { TitleAtomProps } from "..";

export const TypeTitle = ({ type, children, style, className }: Partial<TitleAtomProps>) => {
    switch (type) {
      case "h1":
        return (
          <h1 className={`${className} titleAtom styleH1`} style={{ ...style }}>
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 className={`${className} titleAtom styleH2`} style={{ ...style }}>
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className={`${className} titleAtom styleH3`} style={{ ...style }}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 className={`${className} titleAtom styleH4`} style={{ ...style }}>
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5 className={`${className} titleAtom styleH5`} style={{ ...style }}>
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6 className={`${className} titleAtom styleH6`} style={{ ...style }}>
            {children}
          </h6>
        );
      default:
        return (
          <span className={`${className} titleAtom span`} style={{ ...style }}>
            {children}
          </span>
        );
    }
  };