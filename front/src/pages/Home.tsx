import { createSignal } from "solid-js";

export default function Home() {
  const [count, setCount] = createSignal(0);
  return (
    <section>
      <h1>Chatbot</h1>
      <button onClick={() => setCount(count() + 1)}>Clics : {count()}</button>
    </section>
  );
}
