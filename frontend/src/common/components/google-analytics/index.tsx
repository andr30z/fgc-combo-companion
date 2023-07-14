'use client';
import Script from 'next/script';

export const GoogleAnalytics: React.FC<{ googleAnalyticsId?: string }> = ({
  googleAnalyticsId,
}) => {
  if (!googleAnalyticsId) {
    // eslint-disable-next-line no-console
    console.log('GOOGLE_ANALYTICS_ID is not set');
    return null;
  }
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', "${googleAnalyticsId}");`,
        }}
      />
    </>
  );
};
