import { test, expect } from "@playwright/test";

test("envoyer un message et recevoir la réponse", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("Écrivez un message…");
  const send = page.getByRole("button", { name: "Envoyer" });

  await expect(send).toBeDisabled();

  await input.fill("Bonjour");
  await expect(send).toBeEnabled();
  await send.click();

  const messages = page.locator(".message");
  await expect(messages).toHaveCount(2);
  await expect(messages.nth(0)).toHaveText("Bonjour");
  await expect(messages.nth(0)).toHaveClass(/user/);
  await expect(messages.nth(1)).toHaveText("Echo : Bonjour");
  await expect(messages.nth(1)).toHaveClass(/assistant/);

  await expect(input).toHaveValue("");
});

test("affiche une erreur si le back est indisponible", async ({ page }) => {
  await page.route("**/api/chat", (route) => route.fulfill({ status: 500 }));
  await page.goto("/");

  await page.getByPlaceholder("Écrivez un message…").fill("Salut");
  await page.getByRole("button", { name: "Envoyer" }).click();

  await expect(page.locator(".error")).toHaveText("Erreur 500");
});
