var {
    Paper,
    DropDownMenu,
    MenuItem
    } = MUI;

let statusSchema = new SimpleSchema({
    status: {
        type: String,
        label: "What's on your mind?"
    }
})

Welcome = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var friends = Meteor.user().profile.friends;
        var query = {userid: Meteor.userId()};
        if (friends !== undefined) {
            if (friends.length > 0) {
                query = {$or: [{userid: Meteor.userId()}, {userid: {$in: friends}}]};
            }
        }
        return {
            statuses: Statuses.find(query, {sort: {createdAt: -1}}).fetch(),
            currentUser: Meteor.user()
        }
    },
    getInitialState() {
        var val = 3;
        if (Meteor.user().profile.accepting) {
            val = Meteor.user().profile.accepting;
        }
        return {
            value: val
        }
    },

    handleChange(event, index, value)
    {
        this.setState({value: value});
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.accepting": value}});
    },
    postStatus(doc){
        var username = Meteor.user().profile.firstname+" "+Meteor.user().profile.lastname;

        var status={
            text: doc.status,
            userid: Meteor.userId(),
            username: username,
            createdAt: new Date()
        };

        Meteor.call("addStatus", status);
    },
    renderStatuses(){
        return this.data.statuses.map((status) => {
            return <Status key={status._id} status={status}/>;
        });

    },
    render() {
        const cardstyle = {
            height: "100%",
            width: "100%",
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };

        const paperstyle = {
            height: "100%",
            width: "100%",
            margin: 20,
            textAlign: 'left',
            justifyContent: 'true',
            paddingLeft: 15,
            paddingRight: 15,
            display: 'inline-block'
        };

        var name = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;
        var location = Meteor.user().profile.town;

        return (
            <div className="welcome">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <Paper style={cardstyle} zDepth={3}>
                                <h2>{name}</h2>
                                <h4>{location}</h4>
                                <hr/>
                                <div style={{paddingBottom: 20}}>
                                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                        <MenuItem value={1} primaryText="Accepting Guests"/>
                                        <MenuItem value={2} primaryText="Maybe Accepting Guests"/>
                                        <MenuItem value={3} primaryText="Not Accepting Guests"/>
                                        <MenuItem value={4} primaryText="Wants To Meetup"/>
                                    </DropDownMenu>
                                </div>

                            </Paper>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row" style={{paddingLeft: 15}}>
                            <Form id="statusform" schema={statusSchema} onSubmit={this.postStatus}>
                                <TextArea rows={2} rowsMax={5} name="status"/>
                                <SubmitButton label="Post"/>
                            </Form>
                        </div>
                        <div className="row">
                            <Paper style={paperstyle} zDepth={3}>
                                <h1>News</h1>
                                <hr/>
                                {this.renderStatuses()}
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});