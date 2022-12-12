export default (message = '', type = 'success') => {
  const messageContainer = document.createElement('div');
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'X';
  messageContainer.classList.add(
    'alert',
    `alert-${type}`,
    'd-flex',
    'align-items-center',
    'justify-content-between',
  );
  cancelButton.classList.add('btn', 'btn-danger', 'btn-cancel');

  messageContainer.innerText = message;

  messageContainer.appendChild(cancelButton);

  // setTimeout(() => {
  //   messageContainer.remove();
  // }, 2000);

  return messageContainer;
};
