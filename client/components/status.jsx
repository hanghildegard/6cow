var {
    Paper,
    Avatar,
    Card,
    CardHeader,
    CardText,
    Divider
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
            <div style={{paddingBottom: 15}}>
                <Card zDepth={0}>
                    <CardHeader
                        title={this.props.status.username}
                        subtitle={this.props.status.createdAt.toLocaleString()}
                        avatar={avatar}
                        />
                    <CardText>
                        {this.props.status.text}
                    </CardText>
                </Card>
                <Divider />
            </div>
        );
    }
});