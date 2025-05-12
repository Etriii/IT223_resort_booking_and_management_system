export function apiFetch(url, options = {}) {
  return fetch(`http://localhost:8000/api.php?${url}`, {
    credentials: 'include', // ensures cookies like user_id are sent
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
}
