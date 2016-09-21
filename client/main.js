import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Cards } from '../imports/api/cards.js';
import { Accounts } from 'meteor/accounts-base'

import './main.html';
 
Template.backlog.helpers({
    cards() {
        return Cards.find({stage:100,userId:Meteor.userId()});
    },
});

Template.todo.helpers({
    cards() {
        return Cards.find({stage:200,userId:Meteor.userId()});
    },
});


Template.inprogress.helpers({
    cards() {
        return Cards.find({stage:300,userId:Meteor.userId()});
    },
});


Template.done.helpers({
    cards() {
        return Cards.find({stage:400,userId:Meteor.userId()});
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
        var currentUserId = Meteor.userId();
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
            userId: currentUserId,
            task: taskname,
            description: taskdescription,
            stage: taskstage,
            createdAt: new Date()
        });
        event.target.taskname.value = '';
        event.target.taskdescription.value = '';
        event.target.taskstage.value = 'Future';
        jQuery.noConflict();
        $('#addTask').modal('hide');
        return false;
    }
});

Template.edittask.events({
    "submit .edit-task": function(event){
        var currentUserId = Meteor.userId();
        var taskid = event.target.taskid.value;
        var taskname = event.target.taskname.value;
        var taskdescription = event.target.taskdescription.value;
        var taskstage =parseInt(event.target.taskstage.value);

        Cards.update({'_id':taskid},
            {
                "userId": currentUserId,
                "task" : taskname,
                "description" : taskdescription,
                "stage":taskstage,
                createdAt: new Date()
            });

        event.target.taskname.value = '';
        event.target.taskdescription.value = '';
        event.target.taskstage.value = 'Future';

        $('#editTask').modal('toggle');
        return false;
    }
});

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});

//Router.route('forgot password', {
//    name: 'edittask',
//    template: 'edittask'
//});

////Routes
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp', {
//    path: '/register'
//});
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('changePwd');