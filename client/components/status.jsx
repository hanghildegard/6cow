var {
    Paper,
    Avatar
    } = MUI;

Status = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        status: React.PropTypes.object.isRequired
    },
    deleteOwnStatus() {
        Meteor.call("removeStatus", this.props.status._id);
    },
    editOwnStatus(newstat) {
        Meteor.call("editStatus", this.props.status._id, newstat);
    },
    render() {

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

        var names = this.props.status.username.split(" ");
        let initials = names[0][0]+names[1][0];
        if (Meteor.user().profile.picture)
        {
            avatar=(<Avatar src={Meteor.user().profile.picture} />)
        }
        else
        {
            avatar=(<Avatar>{initials}</Avatar>)
        }

        return (
            <div>
                <Paper style={paperstyle} zDepth={3} style={{width: "100%", marginBottom: 5}}>
                    <div className="row" style={{verticalAlign: "middle"}}>
                        <div className="col-1" style={{verticalAlign: "middle"}}>
                            {avatar}
                        </div>
                        <div className="col-11">
                            <div className="row">
                                <h4>{this.props.status.username}</h4>
                            </div>
                            <div className="row">
                                {this.props.status.createdAt.toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row" style={{paddingBottom: 20, paddingTop: 10, paddingLeft: 10}}>
                        {this.props.status.text}
                    </div>
                </Paper>
            </div>
        );
    }
});