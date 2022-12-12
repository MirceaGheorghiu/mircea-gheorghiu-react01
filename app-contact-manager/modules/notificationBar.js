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

  if (target.classList.contains('btn-cancel')) {
    target.parentElement.remove();
  }
});

export default notificationBar;
