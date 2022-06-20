import React from 'react';
import './button.css';

export enum ButtonSize {
  Large = 'large',
  Regular = 'regular',
}

export enum ButtonThemes {
  Light = 'light',
  Dark = 'dark',
}
export interface ButtonProps {
  theme: ButtonThemes;
  size: ButtonSize;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { theme, size, onClick, children } = props;

  return (
    <button className={`btn btn-${theme} btn-${size}`} onClick={onClick}>
      <h5>{children}</h5>
    </button>
  );
};
