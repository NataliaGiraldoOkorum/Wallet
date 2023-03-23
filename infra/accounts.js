import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import WalletsCollection from '../api/collections/WalletsCollection';

const getEmailFromUser = user => {
    if (user.services?.google) {
        return user.services.google.email;
    }
   return user.emails[0].address;
};

Accounts.onCreateUser((options, user) => {
    const customizedUser = { ...user };

    WalletsCollection.insert({ userId: user._id, createdAt: new Date() });

    customizedUser.email = getEmailFromUser(user);

    return customizedUser;
});

Accounts.setDefaultPublishFields({
    ...Accounts._defaultPublishFields.projection,
    email: 1,
});

const settings = Meteor.settings || {};
Meteor.startup(() => {
    if (!settings.googleClientId || !settings.googleSecret) {
        throw new Error('googleClientId and googleSecret are required');
    }
    //Accounts.config({restrictCreationByEmailDomain:'okorum.com'});
    ServiceConfiguration.configurations.upsert({
        service: 'google',
    }, { $set: {
        service: 'google',
            clienteId: settings.googleClientId,
            secret: settings.googleSecret,
    } });
});
