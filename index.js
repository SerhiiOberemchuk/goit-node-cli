import * as contactsServices from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.listContacts();
      console.table(allContacts);
      return allContacts;

    case "get":
      const contact = await contactsServices.getContactById(id);
      console.log(contact);
      return contact;

    case "add":
      const addedContact = await contactsServices.addContact(data);
      console.log(addedContact);
      return addedContact;

    case "remove":
      const deleteContact = await contactsServices.removeContact(id);
      console.log(deleteContact);
      return deleteContact;

    case "update":
      const updatedContact = await contactsServices.updateContact(id, data);
      console.log(updatedContact);
      return updatedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
