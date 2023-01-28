import { FunctionComponent, ReactElement } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactElement | string;
  className?: string;
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
