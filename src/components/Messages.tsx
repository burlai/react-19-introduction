import { useOptimistic, useState, useEffect } from "react";
import { postMessage, getMessages } from "../utils";

type Message = {
  text: string;
  sending?: boolean;
};

type ThreadProps = {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
  refetchMessages: () => Promise<void>;
};

function Thread({ messages, sendMessage, refetchMessages }: ThreadProps) {
  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);

    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => {
      if (typeof newMessage === "string") {
        return [
          ...state,
          {
            text: newMessage,
            sending: true,
          },
        ];
      }

      return state;
    }
  );

  return (
    <>
      {optimisticMessages.map((message: Message, index: number) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}

      <form action={formAction}>
        <input
          type="text"
          name="message"
          placeholder="Type something!"
          required
        />
        <button type="submit" className="button ml-12">
          Send
        </button>
      </form>

      <button onClick={refetchMessages} className="mt-24">
        Refresh Messages
      </button>
    </>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState([] as Message[]);

  async function fetchMessages() {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function sendMessage(formData: FormData) {
    const sentMessage = await postMessage(formData.get("message") as string);

    setMessages([...messages, { text: sentMessage, sending: false }]);
  }

  return (
    <Thread
      messages={messages}
      sendMessage={sendMessage}
      refetchMessages={fetchMessages}
    />
  );
}
