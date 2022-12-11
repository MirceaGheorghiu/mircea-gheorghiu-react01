export default (message = '', type = 'success') => {
  const messageContainer = document.createElement('div');
  const addCancelButton = document.createElement('button');
  addCancelButton.innerHTML = 'Cancel';
  messageContainer.classList.add(
    'alert',
    `alert-${type}`,
    'd-flex',
    'align-items-center',
    'justify-content-between',
  );
  addCancelButton.classList.add('btn', 'btn-danger');

  messageContainer.innerText = message;

  messageContainer.appendChild(addCancelButton);

  addCancelButton.addEventListener('click', () => {
    messageContainer.remove();
  });

  setTimeout(() => {
    messageContainer.remove();
  }, 2000);

  return messageContainer;
};
