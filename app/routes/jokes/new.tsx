import type {ActionFunction} from '@remix-run/node';
import {db} from '~/utils/db.server';
import {redirect} from '@remix-run/node';

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');
  if (typeof name !== 'string' || typeof content !== 'string') {
    throw new Error('Missing name or content');
  }
  const fields = {name, content};
  const joke = await db.joke.create({data: fields});
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name"/>
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content"/>
          </label>
        </div>
        <div>
          <button type="submit" className="button">Add</button>
        </div>
      </form>
    </div>
  );
}
