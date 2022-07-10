import {Links, LiveReload, Outlet} from '@remix-run/react';
import type {LinksFunction} from '@remix-run/node';

import globalStyleUrl from './styles/global.css';
import globalMediumStyleUrl from './styles/global-medium.css';
import globalLargeStyleUrl from './styles/global-large.css';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: globalStyleUrl},
  {rel: 'stylesheet', href: globalMediumStyleUrl, media: 'print, (min-width: 640px)'},
  {rel: 'stylesheet', href: globalLargeStyleUrl, media: 'screen and (min-width: 1024px)'},
];

export default function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <title>Remix: So great, it's funny!</title>
      <Links/>
    </head>
    <body>
    <Outlet/>
    <LiveReload />
    </body>
    </html>
  );
}
