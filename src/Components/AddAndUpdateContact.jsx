import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AddAndUpdateContact = ({
  isEdit,
  contact,
  isOpen,
  onClose,
  contacts,
}) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && contact) {
      setFormData({ name: contact.name, email: contact.email });
    } else {
      setFormData({ name: "", email: "" }); // Reset for new contact
    }
  }, [isOpen]);
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully");

      console.log("Contact added successfully:", contact);
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact");
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact edited successfully");

      console.log("Contact Edited successfully:", contact);
    } catch (error) {
      console.error("Error editing contact:", error);
      toast.error("Failed to edit contact");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate the name field
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    }

    // Validate the email field
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid.";
    } else if (
      !validationErrors.name &&
      contacts &&
      // contacts.some((contact) => contact.email === formData.email)
      contacts.some((c) => c.email === formData.email && c.id !== contact?.id)
    ) {
      // Only add "email exists" error if name is valid
      validationErrors.email = "Email already exists.";
    }

    setErrors(validationErrors);

    // Proceed to add contact if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      {
        isEdit ? updateContact(formData, contact.id) : addContact(formData);
      }
    }

    //addContact({ name: details.name, email: details.email });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="text-2xl font-bold text-Orange">
          {isEdit ? "Edit" : "Add New"} Contact
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-xl">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            placeholder="Enter your full name"
            className="rounded-md border-2 border-Gray p-1"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="eg:-example@gmail.com"
            className="rounded-md border-2 border-Gray p-1"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <button
            type="submit"
            className="self-end rounded-lg border-2 bg-Orange px-3 py-1 font-semibold hover:opacity-90"
          >
            {isEdit ? "Save Edit" : "Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
