import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema({
  name: {
    type: String
  },
  email: {
    type: String,
    // regEx: SimpleSchema.RegEx.email,
  },
  imageURL: {
    type: String,
    optional: true
  },
  walletId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  }
});

ContactsCollection.attachSchema(ContactsSchema);