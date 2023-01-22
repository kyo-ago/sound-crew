let observer: MutationObserver | null = null;
export const zoomChatObserver = (newMessage: (text: string) => void) => {
  if (observer) {
    return;
  }
  const chatRoot = document.querySelector('[role="dialog"]')!;
  const messages = new Map<string, boolean>();
  observer = new MutationObserver(() => {
    chatRoot.querySelectorAll("li").forEach((li) => {
      const id = li.style.top;
      const text = li.lastChild?.textContent || "";
      if (messages.has(id)) {
        return;
      }
      messages.set(id, true);
      newMessage(text);
    });
  });
  observer.observe(chatRoot, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"],
  });
};
