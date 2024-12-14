// Simulate message delivery
export async function deliverMessageWithTimeout(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

export async function getMessages() {
  const response = await fetch("http://localhost:3333/api/messages");
  return await response.json();
}

export async function postMessage(text: string) {
  const response = await fetch("http://localhost:3333/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    return "Failed to send message";
  }

  const data: { text: string } = await response.json();
  return data.text;
}
