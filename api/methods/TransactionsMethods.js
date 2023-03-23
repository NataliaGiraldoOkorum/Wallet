import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TransactionsCollection, ADD_TYPE, TRANSFER_TYPE } from '../collections/TransactionsCollection';
import SimpleSchema from 'simpl-schema';
import { WalletRoles } from '../../infra/WalletRoles';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
   'transactions.insert'(args) {
      const { userId } = this;
      if (!userId) {
         throw Meteor.Error('Access denied');
      }

    const schema = new SimpleSchema({
        isTransfering: {
           type: Boolean,
        },
        sourceWalletId: {
           type: String,
        },
        destinationWalletId: {
            type: String,
            optional: !args.isTransfering,
         },
         amount: {
            type: Number,
            min: 1,
         },
    });
    const cleanArgs = schema.clean(args);
    schema.validate(cleanArgs);

    const { isTransfering, sourceWalletId, destinationWalletId, amount } = args;
        return TransactionsCollection.insert({
            type: isTransfering ? TRANSFER_TYPE : ADD_TYPE,
            sourceWalletId,
            destinationWalletId: isTransfering ? destinationWalletId : null,
            amount,
            createdAt: new Date(),
            userId,
        });
    },
    'transactions.remove'(transactionId) {
      const { userId } = this;
      if (!userId) {
         throw Meteor.Error('Access denied');
      }
      check(transactionId, String);

      if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
         throw new Error('Permission denied');
      }
      return TransactionsCollection.remove(transactionId);
    },
});
