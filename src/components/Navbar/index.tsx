import React, { FC, useCallback, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { LogoutIcon } from '@heroicons/react/outline';

import Logo from 'components/Logo';
import ThemeSelector from 'components/ThemeSelector';

import { NavbarProps } from './types';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';

const Navbar: FC<NavbarProps> = ({ user }) => {
  const router = useRouter();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-2 bg-blue-700 border-b border-blue-500 dark:bg-blue-900 dark:border-blue-700">
      <div className="container flex flex-row items-center justify-between mx-auto">
        <Logo className="text-white" />
        <div className="flex flex-row items-center justify-between space-x-2">
          <ThemeSelector />
          <Popover
            isOpen={isPopoverOpen}
            align="end"
            reposition={false}
            positions={['bottom']}
            containerClassName="z-20"
            padding={4}
            content={
              <div className="flex flex-col bg-white divide-y rounded shadow divide-slate-300 dark:divide-slate-600 dark:bg-slate-800">
                <div className="flex flex-row items-center p-2 space-x-4">
                  <img
                    src={user?.user_metadata.avatar_url}
                    alt={user?.user_metadata.full_name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p>{user?.user_metadata.full_name}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    className="flex flex-row px-4 py-2 space-x-4 rounded-b hover:bg-slate-700"
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="w-6 h-6" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            }
            onClickOutside={() => setIsPopoverOpen(false)}
          >
            <button
              className="flex items-center justify-center p-1 transition duration-200 ease-in-out transform bg-white rounded-full dark:bg-slate-800 focus:outline-none hover:scale-105 active:scale-95"
              type="button"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <img
                src={user?.user_metadata.avatar_url}
                alt={user?.user_metadata.full_name}
                className="w-8 h-8 rounded-full"
              />
            </button>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
