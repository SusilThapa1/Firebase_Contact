import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactsDisplay from "./Components/ContactsDisplay";
import UseDisclose from "./Hooks/UseDisclose";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = UseDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapShot) => {
          const contactsList = snapShot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setContacts(contactsList);
          console.log(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="overflow-hidden scroll-smooth">
      <Header />

      <SearchBar
        onOpen={onOpen}
        contacts={contacts}
        setContacts={setContacts}
      />

      <ContactsDisplay contacts={contacts} onOpen={onOpen} />
      <AddAndUpdateContact
        isOpen={isOpen}
        onClose={onClose}
        contacts={contacts}
      />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
