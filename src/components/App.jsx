import { ContactsForm } from './ContactsForm/ContactsForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, Notification } from './App.styles';
import { useState } from 'react';

const contactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(contactsState);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number === newContact.number
      )
    ) {
      return toast.error(
        `${newContact.name} or ${newContact.number} has already existed`
      );
    }
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const getVisiableContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const contactsList = getVisiableContacts();

  return (
    <>
      <Title>Phonebook</Title>
      <ContactsForm onSubmit={addContact} />
      <Title>Contacts</Title>
      {contactsList.length !== 0 ? (
        <>
          <Filter filter={filter} handleFilter={handleFilter} />
          <ContactsList handleDelete={handleDelete} contacts={contactsList} />
        </>
      ) : (
        <Notification>Contact list is empty =(</Notification>
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
