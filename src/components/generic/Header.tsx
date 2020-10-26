import React from 'react';

type HeaderProps = {
  readonly title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="pl-5 p-3 mb-2 bg-primary text-white">
      <h2>
        {title}
      </h2>
    </header>
  );
}
