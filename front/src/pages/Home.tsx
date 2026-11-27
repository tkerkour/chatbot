import { createSignal, For, Show } from "solid-js";

type Message = { id: number; role: "user" | "assistant"; text: string };

export default function Home() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [input, setInput] = createSignal("");
  const [sending, setSending] = createSignal(false);
  const [error, setError] = createSignal("");
  let nextId = 0;

  const push = (role: Message["role"], text: string) =>
    setMessages((prev) => [...prev, { id: nextId++, role, text }]);

  async function send(e: SubmitEvent) {
    e.preventDefault();
    const text = input().trim();
    if (!text || sending()) return;

    push("user", text);
    setInput("");
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data: { reply: string } = await res.json();
      push("assistant", data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau");
    } finally {
      setSending(false);
    }
  }

  return (
    <section class="chat">
      <h1>Chatbot</h1>
      <ul class="messages">
        <For each={messages()}>
          {(m) => <li class={`message ${m.role}`}>{m.text}</li>}
        </For>
      </ul>
      <Show when={error()}>
        <p class="error">{error()}</p>
      </Show>
      <form onSubmit={send}>
        <input
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          placeholder="Écrivez un message…"
          autofocus
        />
        <button type="submit" disabled={sending() || !input().trim()}>
          Envoyer
        </button>
      </form>
    </section>
  );
}
