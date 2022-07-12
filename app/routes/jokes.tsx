import {Link, Outlet, useLoaderData} from '@remix-run/react';
import type {LinksFunction, LoaderFunction} from '@remix-run/node';
import styleUrl from '~/styles/jokes.css';
import {db} from '~/utils/db.server';
import {json} from '@remix-run/node';
import {getUser} from '~/utils/session.server';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: styleUrl},
];

type LoaderData = {
  jokeListItems: Array<{ id: string, name: string }>,
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({request}) => {
  const jokeListItems = await db.joke.findMany({
    take: 5,
    select: {id: true, name: true},
    orderBy: {createAt: 'desc'}
  });
  const user = await getUser(request);
  const data: LoaderData = {jokeListItems, user};
  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
          {/* 这里使用 form 退出按钮表单的形式，避免 CSRF 问题 */}
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokeListItems.map(joke => (
                <li key={joke.id}>
                  <Link to={`${joke.id}`}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet/>
          </div>
        </div>
      </main>
    </div>
  );
}
