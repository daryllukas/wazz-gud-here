import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="flex py-4 justify-center">
      <p>For Open Source ❤️&nbsp;</p>
      <p>
        by &nbsp;
        <a
          href={'https://twitter.com/daryllukas'}
          target="_blank"
          title="Daryl Lukas"
          rel="noreferrer"
        >
          Daryl Lukas
        </a>
      </p>
    </footer>
  );
};
