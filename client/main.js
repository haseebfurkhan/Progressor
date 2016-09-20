import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Cards } from '../imports/api/cards.js';

import './main.html';
 
Template.backlog.helpers({
    cards() {
        return Cards.find({stage:100});
    },
});


Template.todo.helpers({
    cards() {
        return Cards.find({stage:200});
    },
});


Template.inprogress.helpers({
    cards() {
        return Cards.find({stage:300});
    },
});


Template.done.helpers({
    cards() {
        return Cards.find({stage:400});
    },
});

Template.card.events({
    "click .delete-this": function(event)
    {
        if(confirm("Delete this task?"))
        {
            Cards.remove(this._id);
        }
        return false;
    }
});

Template.addtask.events({
    "submit .add-task": function(event){
        var taskname = event.target.taskname.value;
        var taskdescription = event.target.taskdescription.value;
        var taskstage;
        switch (event.target.taskstage.value) {
            case "Future":
                taskstage = 100;
                break;
            case "Proposed":
                taskstage = 200;
                break;
            case "In Progress":
                taskstage = 300;
                break;
            case "Completed":
                taskstage = 400;
                break;
        }
        Cards.insert({
            task: taskname,
            description: taskdescription,
            stage: taskstage,
            createdAt: new Date()
        });
        event.target.taskname.value = '';
        event.target.taskdescription.value = '';
        event.target.taskdescription.value = '';
        event.target.taskdescription.value = 'Future';
        jQuery.noConflict();
        $('#addTask').modal('hide');
        return false;
    }
});

Template.edittask.events({
    "submit .edit-task": function(event){
        var taskid = event.target.taskid.value;
        var taskname = event.target.taskname.value;
        var taskdescription = event.target.taskdescription.value;
        var taskstage =parseInt(event.target.taskstage.value);

        Cards.update({'_id':taskid},
            {
                "task" : taskname,
                "description" : taskdescription,
                "stage":taskstage,
                createdAt: new Date()
            });

        $('#editTask').modal('toggle');
        return false;
    }
});