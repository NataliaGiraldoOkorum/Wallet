import { Meteor } from 'meteor/meteor';
import '../api/collections/ContactsCollection';
import '../api/methods/ContactsMethods';
import '../api/publications/ContactsPublications';
import '../api/collections/WalletsCollection';
import '../api/collections/TransactionsCollection';
import '../api/methods/TransactionsMethods';
import '../api/publications/WalletsPublications';
import '../infra/CustomError';
import '../infra/accounts';


Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
    createdAt: new Date(),
  });
  }
});
