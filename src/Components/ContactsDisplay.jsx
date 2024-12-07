import ContactCard from "./contactCard";
import NotFoundContact from "./NotFoundContact";
const ContactsDisplay = ({ contacts }) => {
  return (
    <div className="flex flex-col gap-2">
      {contacts.length <= 0 ? (
        <NotFoundContact />
      ) : (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default ContactsDisplay;
