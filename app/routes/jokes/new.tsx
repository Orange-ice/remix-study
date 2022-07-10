import type {ActionFunction} from '@remix-run/node';
import {db} from '~/utils/db.server';
import {json, redirect} from '@remix-run/node';
import {useActionData} from '@remix-run/react';
import {requireUserId} from '~/utils/session.server';


function validateJokeContent(content: string) {
  if (content.length < 10) {
    return 'Joke content must be at least 10 characters long';
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return 'Joke name must be at least 3 characters long';
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    content: string | undefined;
  };
  fields?: {
    name: string;
    content: string;
  }
}

const badRequest = (data: ActionData) => json(data, {status: 400});

export const action: ActionFunction = async ({request}) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');
  if (typeof name !== 'string' || typeof content !== 'string') {
    return badRequest({formError: 'Missing name or content'});
  }
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  const fields = {name, content};
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({fieldErrors, fields});
  }
  const joke = await db.joke.create({data: {...fields, jokesterId: userId}});
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              defaultValue={actionData?.fields?.name}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.name) ||
                undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.name
                  ? 'name-error'
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p
              className="form-validation-error"
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:
            <textarea
              name="content"
              defaultValue={actionData?.fields?.content}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) ||
                undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content
                  ? 'content-error'
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p
              className="form-validation-error"
              role="alert"
            >
              {actionData.formError}
            </p>
          ) : null}
          <button type="submit" className="button">Add</button>
        </div>
      </form>
    </div>
  );
}
