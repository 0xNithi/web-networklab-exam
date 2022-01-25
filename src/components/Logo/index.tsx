import type { FC } from 'react';
import { WifiIcon } from '@heroicons/react/solid';

import type { LogoProps } from './types';

const Logo: FC<LogoProps> = ({ className }) => (
  <div className={`flex flex-col items-center select-none${className ? ` ${className}` : ''}`}>
    <div className="inline-flex text-2xl italic font-bold">
      Netw
      <WifiIcon className="w-8 ml-1 fill-current" />
      rk
    </div>
    <div className="text-xs font-bold">Laboratory</div>
  </div>
);

export default Logo;
