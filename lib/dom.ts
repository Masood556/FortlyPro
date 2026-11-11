/**
 * Next.js keeps up to three previously visited routes mounted but hidden
 * (React <Activity>), so the document can briefly contain two copies of a
 * page's elements. These helpers always pick the one that is actually rendered.
 */
const isRendered = (element: Element) => element.getClientRects().length > 0;

export function findVisible<T extends Element = HTMLElement>(selector: string): T | null {
  const match = Array.from(document.querySelectorAll<T>(selector)).find(isRendered);
  return match ?? null;
}

export const findVisibleById = <T extends Element = HTMLElement>(id: string): T | null =>
  findVisible<T>(`[id="${CSS.escape(id)}"]`);
