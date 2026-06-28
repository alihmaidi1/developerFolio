import { createSignal } from "../store/signal";

import type { Locale } from "./types";

export const locale = createSignal<Locale | null>(null);
export const translations = createSignal<Record<string, string>>({});
