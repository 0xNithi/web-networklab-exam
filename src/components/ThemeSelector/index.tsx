import { FC, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { useTheme } from 'next-themes';
import { DesktopComputerIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';

const ThemeSelector: FC = () => {
  const { theme, setTheme } = useTheme();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const renderThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      case 'system':
        return <DesktopComputerIcon className="w-5 h-5" />;
      default:
        return;
    }
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      align="end"
      reposition={false}
      positions={['bottom']}
      containerClassName="z-20"
      padding={4}
      content={
        <div className="flex flex-col bg-white divide-y rounded shadow divide-slate-300 dark:divide-slate-600 dark:bg-slate-800">
          <button
            className="flex flex-row px-4 py-2 space-x-4 rounded-t hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => {
              setTheme('light');
              setIsPopoverOpen(false);
            }}
          >
            <SunIcon className="w-6 h-6" />
            <span>Light</span>
          </button>
          <button
            className="flex flex-row px-4 py-2 space-x-4 hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => {
              setTheme('dark');
              setIsPopoverOpen(false);
            }}
          >
            <MoonIcon className="w-6 h-6" />
            <span>Dark</span>
          </button>
          <button
            className="flex flex-row px-4 py-2 space-x-4 rounded-b hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => {
              setTheme('system');
              setIsPopoverOpen(false);
            }}
          >
            <DesktopComputerIcon className="w-6 h-6" />
            <span>System</span>
          </button>
        </div>
      }
      onClickOutside={() => setIsPopoverOpen(false)}
    >
      <button
        className="flex items-center justify-center p-2.5 transition duration-200 ease-in-out dark:bg-slate-800 transform bg-white rounded-full focus:outline-none hover:scale-105 active:scale-95"
        type="button"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        {renderThemeIcon()}
      </button>
    </Popover>
  );
};

export default ThemeSelector;
