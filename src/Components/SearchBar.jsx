import { FiSearch } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const SearchBar = ({ onOpen, contacts, setContacts }) => {
  function filterContacts(e) {
    const conValue = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapShot) => {
      const contactsList = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(conValue);
      const filteredContacts = contactsList.filter((contact) =>
        contact.name.toLowerCase().includes(conValue.toLowerCase()),
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  }
  return (
    <div className="mx-auto my-2 flex h-[60px] max-w-[360px] items-center justify-center gap-3 px-4 py-2">
      <div className="flex h-[40px] w-[295px] items-center justify-between gap-3 rounded-lg border-[2px] border-white px-2 py-1">
        <FiSearch className="h-6 w-6 text-3xl" />
        <input
          onChange={filterContacts}
          type="text"
          placeholder="Search Contacts..."
          className="border-none bg-transparent text-[20px] outline-none placeholder:text-white"
        />
      </div>
      <div className="flex items-center">
        <BsFillPlusCircleFill
          title="Add new contact"
          onClick={onOpen}
          className="h-[52px] w-[52px] text-5xl"
        />
      </div>
    </div>
  );
};

export default SearchBar;
