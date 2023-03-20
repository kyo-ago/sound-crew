import { zoomChatObserver } from "./zoomChatObserver";

const clickAudioButton = (zoomRoot: Element) => {
  const button = zoomRoot.querySelector('[title="Audio"],[title="Unmute"]');
  if (!button) {
    return;
  }
  setTimeout(() => {
    if (
      button.compareDocumentPosition(document) &
      Node.DOCUMENT_POSITION_DISCONNECTED
    ) {
      return;
    }
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }, 1000);
};
const muteVideo = (zoomRoot: Element) => {
  zoomRoot.querySelectorAll("video").forEach((video) => {
    video.volume = 0;
    video.muted = true;
  });
};
const openChatDialog = (
  zoomRoot: Element,
  newMessage: (text: string) => void
) => {
  if (document.querySelector('[role="dialog"]')) {
    zoomChatObserver(newMessage);
    return;
  }
  zoomRoot
    .querySelector('button[title="More"]')
    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document
    .querySelector("#menu-list-icon-more li")
    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
};
export const zoomUiObserver = (newMessage: (text: string) => void) => {
  const zoomRoot = document.querySelector("#meetingSDKElement")!;
  const observer = new MutationObserver(() => {
    clickAudioButton(zoomRoot);
    muteVideo(zoomRoot);
    openChatDialog(zoomRoot, newMessage);
  });
  observer.observe(zoomRoot, {
    childList: true,
    subtree: true,
  });
};
