import ContactsCollection from '../collections/ContactsCollection';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
   'contacts.insert'({ name, email, imageURL, walletId }) {
    const { userId } = this;
    if (!userId) {
        throw Meteor.Error('Access denied');
    }
        check(name, String);
        check(email, String);
        check(imageURL, String);
        check(walletId, String);

        if (!name) {
            throw new Meteor.Error('Name is required');
        }
        if (!walletId) {
            throw new Meteor.Error('Wallet ID is required');
        }
        return ContactsCollection.insert({
            name,
            email,
            imageURL,
            walletId,
            createdAt: new Date(),
            userId,
        });
    },
    'contacts.remove'({ contactId }) {
        check(contactId, String);
        ContactsCollection.remove(contactId);
    },
    'contacts.archive'({ contactId }) {
        check(contactId, String);
        ContactsCollection.update({ _id: contactId }, { $set: { archived: true } });
    },
});
