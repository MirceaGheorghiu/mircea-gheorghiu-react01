export default (message = '', type = 'success') => {
  const messageContainer = document.createElement('div');
  const closeButton = document.createElement('button');
  messageContainer.classList.add(
    'alert',
    `alert-${type}`,
    'd-flex',
    'align-items-center',
    'justify-content-between',
  );
  closeButton.classList.add('btn', 'btn-close', 'btn-close');
  closeButton.type = 'button';
  closeButton.title = 'Close button';

  messageContainer.innerText = message;

  messageContainer.appendChild(closeButton);

  setTimeout(() => {
    messageContainer.remove();
  }, 2000);

  return messageContainer;
};
