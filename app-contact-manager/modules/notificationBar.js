const notificationBar = document.querySelector('.notification-bar');

export const addMessage = (messageElement) => {
  notificationBar.append(messageElement);
};

export const clearMessages = () => {
  notificationBar.innerHTML = '';
};

// ty stage.js for event delegation model :))
notificationBar.addEventListener('click', (event) => {
  const { target } = event;

  if (target.nodeName !== 'BUTTON' || !target.classList.contains('btn-close')) {
    return;
  }
  const button = target;
  const parent = button.parentElement;

  parent.remove();
});

export default notificationBar;
