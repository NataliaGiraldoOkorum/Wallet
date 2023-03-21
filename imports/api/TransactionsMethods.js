import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ImportContactsRounded } from "@mui/icons-material";
import TransactionsCollection from "./TransactionsCollection";

Meteor.methods({
   'transactions.insert'({ isTransfering, sourceWalletId, destinationWalletId, amount }) {
        check(isTransfering, Boolean);
        check(sourceWalletId, String);
        check(destinationWalletId, String);
        check(amount, Number);

        if (!sourceWalletId) {
            throw new Meteor.Error("Source wallet is required");
        }
        if (!isTransfering && !destinationWalletId) {
            throw new Meteor.Error("Destination wallet is required");
        }
        if(!amount || amount <= 0 ){
            throw new Meteor.Error("Amount is required");
        }
        return TransactionsCollection.insert({ 
            type: isTransfering? 'TRANFER' : 'ADD', 
            sourceWalletId, 
            destinationWalletId: isTransfering ? destinationWalletId : null, 
            amount, 
            createdAt: new Date(), 
        });
    },
});

