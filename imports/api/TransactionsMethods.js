import { Meteor } from 'meteor/meteor';
import TransactionsCollection from "./TransactionsCollection";
import SimpleSchema from "simpl-schema";

Meteor.methods({
   'transactions.insert'(args) {

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
            type: isTransfering? 'TRANFER' : 'ADD', 
            sourceWalletId, 
            destinationWalletId: isTransfering ? destinationWalletId : null, 
            amount, 
            createdAt: new Date(), 
        });
    },
});

