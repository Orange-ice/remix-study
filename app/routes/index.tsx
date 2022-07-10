import stylesUrl from '~/styles/index.css';
import type {LinksFunction} from '@remix-run/node';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: stylesUrl},
];

export default function IndexRoute() {
  return <div>Hello Index Route</div>;
}
