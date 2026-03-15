// No "use cache" here — this is the dynamic wrapper.
// It reads cookies() safely, then passes cart data into the cached shell.
import { getCart } from "./actions";
import { PPRShell } from "./PPRShell";

export default async function PPRPage() {
  // cookies() is called here at the route level — outside any cache boundary.
  // This is the pattern Next.js recommends: read dynamic data outside,
  // pass it as a prop into the cached component.
  const cart = await getCart();
  return <PPRShell cart={cart} />;
}
