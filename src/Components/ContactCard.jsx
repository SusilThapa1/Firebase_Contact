import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import AddAndUpdateContact from "./AddAndUpdateContact";
import UseDisclose from "../Hooks/UseDisclose";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = UseDisclose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete contact");
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="mx-auto flex h-16 w-[360px] items-center justify-between gap-10 rounded-lg bg-Yellow px-1 py-4"
      >
        <div className="flex">
          <HiOutlineUserCircle className="text-5xl text-Orange" />
          <div className="text-black">
            <h2 className="text-[16px] font-medium">{contact.name}</h2>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-4xl text-black">
          <RiEditCircleLine
            title="Edit"
            onClick={onOpen}
            className="cursor-pointer"
          />
          <IoMdTrash
            title="delete"
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer text-red-500"
          />
        </div>
      </div>
      <AddAndUpdateContact
        isEdit
        contact={contact}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default ContactCard;
