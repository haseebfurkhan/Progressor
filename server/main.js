import { Meteor } from 'meteor/meteor';
import { Cards } from '../imports/api/cards.js';

Meteor.startup(() => {
    // code to run on server at startup
    //Cards.find().fetch();
    
    Meteor.methods({
        'updateCard': function(taskid,taskstage){
            if(!isNaN(taskstage))
            {
                Cards.update({'_id':taskid},
               { $set: { "stage":parseInt(taskstage)}}
              );
            }
            return false;
        }
    });

});
