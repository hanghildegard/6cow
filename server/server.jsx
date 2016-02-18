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
                    userid: status.userid,
                    username: status.username
                });
            }
        }
    }
)