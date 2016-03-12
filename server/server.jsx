Meteor.methods({
        addStatus(status){
            if (!Meteor.userId())
            {
                throw new Meteor.Error("not-authorized");
            }
            else
            {
                Statuses.insert({
                    text: status.text,
                    createdAt: status.createdAt,
                    userid: Meteor.userId(),
                    username: Meteor.user().profile.firstname+" "+Meteor.user().profile.lastname
                });
            }
        },
        updateLogin(){
            if (Meteor.userId())
            {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.lastLogin": new Date()}});
            }
        }
    }
)