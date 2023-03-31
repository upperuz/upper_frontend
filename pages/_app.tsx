import 'styles/index.scss';

import { FeedbackModal, Footer, Navigation, NoticeBoard, Sidebar } from 'components';
import { ThemeProvider } from 'context';
import { getCookie } from 'cookies-next';
import { useAuth, useDevice, useScrollToggler, useTheme } from 'hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { wrapper } from 'store';
import { useLazyGetCurrentBlogQuery } from 'store/apis';
import { IServerSideContext, TTheme } from 'types';
import { appDynamic } from 'utils';
import { PRODUCTION_HOST } from 'variables';

const DynamicLoginModal = appDynamic(() => import('components/LoginModal'));

const DynamicRegisterModal = appDynamic(() => import('components/RegisterModal'));

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { getToken, getRefreshToken, authenticateTokens, unauthenticate, setCurrentBlog } =
    useAuth();
  const [fetchCurrentBlog] = useLazyGetCurrentBlogQuery();
  const { themeColors, theme } = useTheme();
  const { isMobile } = useDevice();

  useScrollToggler('.main', !isMobile);

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticateTokens({ token, refreshToken });
      fetchCurrentBlog().unwrap().then(setCurrentBlog);
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
      <NoticeBoard />
      <div className={`app theme-${theme}`}>
        <Navigation />
        <DynamicLoginModal />
        <DynamicRegisterModal />
        <FeedbackModal />
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

interface IAppWithProviderProps extends AppProps {
  theme: TTheme;
}

const AppWithProvider = ({ theme, ...props }: IAppWithProviderProps): JSX.Element => {
  return (
    <ThemeProvider defaultTheme={theme}>
      <MyApp {...props} />
    </ThemeProvider>
  );
};

const WrappedApp = wrapper.withRedux(AppWithProvider);

WrappedApp.getInitialProps = async (context: {
  ctx: IServerSideContext;
}): Promise<{ theme: TTheme }> => {
  const { req, res } = context.ctx;
  const theme = (getCookie('theme', { req, res }) || 'light') as TTheme;

  return { theme };
};

export default WrappedApp;
