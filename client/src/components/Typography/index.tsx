import { ReactNode } from "react";
import styles from "./style.module.scss";

interface TypographyProps {
  children: ReactNode;
  variant: "header" | "subheader" | "body" | "label";
  bold?: boolean;
  className?: string;
}

const Typography = ({
  children,
  variant,
  bold,
  className,
}: TypographyProps) => {
  const variantToStyle = (): string => {
    switch (variant) {
      case "header":
        return styles.header;
      case "subheader":
        return styles.subheader;
      case "body":
        return styles.body;
      case "label":
        return styles.label;
    }
  };
  return (
    <div
      style={bold ? { fontWeight: 700 } : undefined}
      className={`${variantToStyle()} ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Typography;
