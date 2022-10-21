import Link from 'next/link';
import React from 'react';
import { useModalContext } from '../context/Modal';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export const AboutModal: React.FC = () => {
  const { setAboutModalVisible } = useModalContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = () => {
    setAboutModalVisible(false);
  };
  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black opacity-40"></div>
      <div className="fixed inset-0 z-50 flex items-center">
        <div
          ref={ref}
          className="mx-auto max-h-[95%] w-[500px] overflow-auto rounded-lg bg-white shadow-lg"
        >
          <div className="bg-primary relative p-5">
            <button
              onClick={() => setAboutModalVisible(false)}
              className="text-5xl text-white absolute top-2 right-2 p-1 transition-all hover:bg-orange-500 active:scale-90"
            >
              &times;
            </button>
            <h2 className="text-5xl font-bold text-white">About</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl">
                Wazz Gud Here allows you to browse menus from local restaurants.{' '}
              </p>
              <p className="text-base">
                It is a proof of concept for an electronic menu service that
                allows customers to quickly <strong>access menus</strong> on
                their phones <strong>by scanning a QR code provider</strong> at
                their local restaurant.
              </p>
              <p className="text-lg uppercase font-semibold">Tech Stack</p>
              <ul>
                <li>Next.js for frontend</li>
                <li>GraphQL for API</li>
                <li>Strapi CMS for Backend</li>
                <li>Tailwind CSS for UI</li>
              </ul>
              <p className="mt-4">
                Source code available on{' '}
                <a
                  href={'https://github.com/daryllukas/wazz-gud-here'}
                  target="_blank"
                  title="Daryl Lukas"
                  rel="noreferrer"
                >
                  Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
