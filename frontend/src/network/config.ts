export const post = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json(); // parses JSON response into native JavaScript objects
};
