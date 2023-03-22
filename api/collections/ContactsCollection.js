import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


const ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // regEx: SimpleSchema.RegEx.email,
  },
  imageURL: {
    type: String,
    optional: true,
  },
  walletId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  },
  archived: {
    type: Boolean,
    optional: true,
  },
  userId: {
    type: String,
  },
});

ContactsCollection.attachSchema(ContactsSchema);
export default ContactsCollection;
