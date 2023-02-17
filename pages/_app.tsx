import 'styles/index.scss';

import { Footer, Navigation, Sidebar } from 'components';
import { useAuth, useDevice, useScrollToggler, useTheme } from 'hooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { wrapper } from 'store';
import { appDynamic } from 'utils';
import { PRODUCTION_HOST } from 'variables';

const DynamicLoginModal = appDynamic(() => import('components/LoginModal'));

const DynamicRegisterModal = appDynamic(() => import('components/RegisterModal'));

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { getToken, getRefreshToken, authenticate, unauthenticate } = useAuth();
  const { themeColors, theme } = useTheme();
  const { isMobile } = useDevice();

  useScrollToggler('.main', !isMobile);

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticate({ token, refreshToken });
    } else {
      unauthenticate();
    }
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.bg, color: themeColors.font }}>
      <Head>
        <meta property='og:title' content='UPPER' key='og-title' />
        <title key='title'>UPPER</title>
      </Head>
      {typeof window === 'object' && window.location.host === PRODUCTION_HOST && (
        <>
          <Script
            strategy='afterInteractive'
            src='https://www.googletagmanager.com/gtag/js?id=G-6XYX2X34TV'
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6XYX2X34TV');
            `,
            }}
          />
        </>
      )}
      <div className={`app theme-${theme}`}>
        <Navigation />
        <DynamicLoginModal />
        <DynamicRegisterModal />
        <main className='main' id='main'>
          <Component {...pageProps} />
          <Footer />
        </main>
        <Sidebar />
      </div>
      <NextNProgress color={themeColors.progressbar} height={3} showOnShallow={true} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
