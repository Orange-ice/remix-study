import {Links, LiveReload, Outlet} from '@remix-run/react';
import type {LinksFunction} from '@remix-run/node';

import globalStyleUrl from './styles/global.css';
import globalMediumStyleUrl from './styles/global-medium.css';
import globalLargeStyleUrl from './styles/global-large.css';
import React from 'react';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: globalStyleUrl},
  {rel: 'stylesheet', href: globalMediumStyleUrl, media: 'print, (min-width: 640px)'},
  {rel: 'stylesheet', href: globalLargeStyleUrl, media: 'screen and (min-width: 1024px)'},
];

function Document({children, title = 'Remix: So great, it\'s funny!'}: { children: React.ReactNode, title?: string }) {
  return (
    <html lang="zh">
    <head>
      <meta charSet="utf-8"/>
      <title>{title}</title>
      <Links/>
    </head>
    <body>
    {children}
    <LiveReload/>
    </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet/>
    </Document>
  );
}

export function ErrorBoundary({error}: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
