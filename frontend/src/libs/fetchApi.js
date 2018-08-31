import config from '../config';

export async function invokeApi({
  type,
  method = "GET",
  urlParams = "",
  body
}) {
  body = body ? JSON.stringify(body) : body;
  const results = await fetch(`${config.api[type].URL}${urlParams}`, {
    method,
    headers: {
      'Content-Type': 'Application/JSON'
    },
    body
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}