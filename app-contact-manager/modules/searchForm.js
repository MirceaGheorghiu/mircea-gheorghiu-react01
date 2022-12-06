import { addMessage, clearMessages } from './notificationBar.js';
import { findContacts } from './query.js';
import createMessage from './message.js';
import { pluralize } from './utils.js';
import { render } from './contact.js';
import stage, { clearStage } from './stage.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // currentTarget este elementul pe care
  // am rulat addEventListener
  const form = event.currentTarget;
  const queryInput = form.q;
  const queryString = queryInput.value;

  clearMessages();
  clearStage();

  const contacts = findContacts(queryString.toLowerCase().replace(/\s/g, ''));
  // nu inteleg de ce nu gaseste contactul scris fara spatii - "carolcarolson", cand dau search - pt verificare am logat si in consola si acolo apare fara spatii
  // ma gandeam ca .reduce din query.js lipeste values si asa cauta dupa string-ul fara spatii luat din queryString, dar nu merge asa :(
  // case insensitive search merge
  const contactsCount = contacts.length;
  const fragment = document.createElement('div');

  contacts.forEach((contact) => {
    fragment.append(render(contact));
  });

  // am obs ca daca apesi search fara valoare / just spaces in input, afiseaza toate contactele..
  // de aceea am mai pus un else (il voi sterge pt a pastra flow-ul de la curs, but it's just for practice :) )
  if (contactsCount < 1) {
    addMessage(createMessage('No contacts found!', 'warning'));
  } else if (queryString === '' || queryString.trim().length === 0) {
    addMessage(createMessage('No input!', 'warning'));
  } else {
    const petsCount = contacts.reduce((petsCount, contact) => {
      petsCount += contact?.pets?.length || 0;

      return petsCount;
    }, 0);

    addMessage(
      createMessage(
        `Found ${pluralize(contactsCount, {
          one: 'contact',
          many: 'contacts',
        })} with ${
          petsCount > 0
            ? pluralize(petsCount, {
                one: 'pet',
                many: 'pets',
              })
            : 'no pets'
        }.`,
      ),
    );
    stage.append(fragment);
  }

  queryInput.value = '';
});

export default searchForm;
