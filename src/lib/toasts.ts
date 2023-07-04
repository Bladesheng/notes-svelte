import type { Toast } from "svelte-french-toast";

const ok: Partial<Toast> = {
  position: "bottom-right",
  style: "background: var(--color-grey-dark); color: var(--font-color-primary);",
  iconTheme: {
    primary: "var(--color-green-dark)",
    secondary: "var(--font-color-secondary)",
  },
};

const err: Partial<Toast> = {
  position: "bottom-right",
  style: "background: var(--color-grey-dark); color: var(--font-color-primary);",
  iconTheme: {
    primary: "var(--color-red)",
    secondary: "var(--font-color-secondary)",
  },
};

export const toastOptions = {
  ok,
  err,
};
