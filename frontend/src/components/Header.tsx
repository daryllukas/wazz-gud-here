import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useModalContext } from '../context/Modal';

export const Header: React.FC = () => {
  const router = useRouter();
  const { setAboutModalVisible } = useModalContext();

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md p-10 text-white">
      <div className="container flex h-full items-center justify-between px-2 md:px-0">
        <Link
          href={router.query.groupId ? `/vendors/${router.query.slug}` : '/'}
        >
          <a className="flex gap-4 font-bold">
            {router.query.groupId && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            )}{' '}
            Wazz Gud Here
          </a>
        </Link>
        <div
          onClick={() => setAboutModalVisible(true)}
          className="flex cursor-pointer items-center gap-2"
        >
          <a className="flex gap-4">About</a>
        </div>
      </div>
    </header>
  );
};
