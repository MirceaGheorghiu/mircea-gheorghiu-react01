import { findContact, findPet } from './query.js';

export const render = (contactId, petId) => {
  const contact = findContact(contactId);
  const pet = findPet(contactId, petId);
  const editPetForm = document.createElement('div');
  const { name, species, age, id } = pet;

  editPetForm.innerHTML = `
    <form class="edit-pet">
      <h4>
        Editing ${contact.name}'s pet ${name}.
      </h4>

      <label class="form-label mt-2">Name</label>
      <input type="text" name="name" class="form-control form-control-sm" value="${name}">

      <label class="form-label mt-3">Species</label>
      <input type="text" name="species" class="form-control form-control-sm" value="${species}">

      <label class="form-label mt-3">Age</label>
      <input type="number" name="age" class="form-control form-control-sm mb-3" value="${age}">

      <input type="hidden" name="id" value="${id}">
      <input type="hidden" name="contactId" value="${contactId}">

      <button type="submit" class="btn btn-secondary me-1 edit-pet">Save</button>
      <button type="button" class="cancel-button btn btn-secondary">Cancel</button>
    </form>
  `;

  return editPetForm;
};
