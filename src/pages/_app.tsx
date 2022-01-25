import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Auth } from '@supabase/ui';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import { supabase } from 'utils/supabaseClient';

import 'styles/globals.css';

if (typeof window !== 'undefined') {
  // LogRocket.init('networklab/exam');
  // setupLogRocketReact(LogRocket);
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      });
    });

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  return (
    <ThemeProvider attribute="class" storageKey="theme_mode" defaultTheme="system">
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Head>
          <title>Network Lab Exam</title>
          <meta charSet="UTF-8" />
          <meta name="description" content="Network Lab Exam" />
          <meta name="keywords" content="Network Lab Exam" />
          <meta name="author" content="Network Lab Member" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
