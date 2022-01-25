import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/ui';

import Logo from 'components/Logo';
import { supabase } from 'utils/supabaseClient';

const Login: NextPage = () => {
  const router = useRouter();
  const { user } = Auth.useUser();

  const handleLoginWithGoogle: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      { redirectTo: 'http://localhost:3000/login' },
    );

    if (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (user && user.email?.endsWith('@kmitl.ac.th')) {
      router.push('/');
    } else if (user) {
      const logout = async () => {
        await supabase.auth.signOut();
      };
      logout();
    }
  }, [user]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-screen select-none bg-gradient-to-b from-blue-400 to-blue-800">
      <div className="flex flex-col border border-blue-300 rounded-lg">
        <Logo className="p-2 text-white" />
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4 bg-white rounded-b-lg">
          <div className="text-xl font-bold text-gray-600">กรุณาเข้าสู่ระบบ</div>
          <button
            className="inline-flex items-center px-4 py-2 font-bold text-gray-600 border border-gray-400 rounded hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
            onClick={handleLoginWithGoogle}
          >
            <img
              className="w-6 mr-4"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
            />
            เข้าสู่ระบบด้วย Google
          </button>
        </div>
      </div>
      <div className="my-2 text-sm text-gray-100">
        <span className="text-red-500">*</span> หมายเหตุ: ใช้อีเมลสถาบันในการเข้าสู่ระบบเท่านั้น
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user && user.email?.endsWith('@kmitl.ac.th')) {
    return { props: {}, redirect: { destination: '/' } };
  }

  return {
    props: {},
  };
};

export default Login;
