import React from 'react';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/colors.css';
import '@/styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IconContext.Provider value={{ color: 'FFD700', size: '50px' }}>
      <ConfigProvider
        theme={{
          token: {
            // golden antique colors
            colorBgLayout: '#f5f5dc',
          },
          components: {
            Table: {
              borderColor: '#f5f5dc',
              headerBg: '#f5f5dc',
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ConfigProvider>
    </IconContext.Provider>
  );
}

export default MyApp;
