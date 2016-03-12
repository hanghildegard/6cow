var {
    Paper,
    DropDownMenu,
    MenuItem,
    GridList,
    GridTile,
    Menu,
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
        if (Meteor.user()) {
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
        }
        else {
            return {}
        }
    },

    handleChange(event, index, value)
    {
        this.data.currentUser.accepting = value;
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.accepting": value}});
    },
    postStatus(doc){
        var username = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;

        var status = {
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

        const menustyle = {
            height: "100%",
            width: "100%",
            margin: 20,
            paddingRight: 15,
            float: 'left',
            position: 'relative',
            zIndex: 0
        };

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginTop: 20
            },
            gridList: {
                width: 800,
                height: 220,
                overflowY: 'auto',
                marginBottom: 24
            }
        };
        const tilesData = [
            {
                img: 'http://lorempixel.com/250/200/city/',
                title: 'London',
                hosts: 50000
            },
            {
                img: 'http://lorempixel.com/250/200/city/',
                title: 'Paris',
                hosts: 34000
            },
            {
                img: 'http://lorempixel.com/250/200/city/',
                title: 'Rome',
                hosts: 65000
            }];


        var name = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;
        var location = Meteor.user().profile.town;
        var image = 'http://lorempixel.com/300/300/people/';
        if (Meteor.user()) {
            if (Meteor.user().profile.image) {
                image = Meteor.user().profile.image;
            }
        }

        var accepting = 3;
        if (this.data.currentUser.profile.accepting) {
            accepting = this.data.currentUser.profile.accepting
        }

        return (
            <div className="welcome">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <Paper style={cardstyle} zDepth={1}>
                                <div style={{width: "100%", paddingTop: 10 }}>
                                    <img src={image}/>
                                </div>
                                <h2>{name}</h2>
                                <h4>{location}</h4>
                                <hr/>
                                <div style={{paddingBottom: 20}}>
                                    <DropDownMenu value={accepting} onChange={this.handleChange}>
                                        <MenuItem value={1} primaryText="Accepting Guests"/>
                                        <MenuItem value={2} primaryText="Maybe Accepting Guests"/>
                                        <MenuItem value={3} primaryText="Not Accepting Guests"/>
                                        <MenuItem value={4} primaryText="Wants To Meetup"/>
                                    </DropDownMenu>
                                </div>

                            </Paper>
                        </div>
                        <div className="row">
                            <Menu style={menustyle}>
                                <MenuItem primaryText="Travel plans" leftIcon={<Icon icon="airplane" />}/>
                                <MenuItem primaryText="Upcoming guests" leftIcon={<Icon icon="home" />}/>
                                <MenuItem primaryText="Upcoming events" leftIcon={<Icon icon="calendar"/>}/>
                                <MenuItem primaryText="Friends" leftIcon={<Icon icon="account-multiple"/>}/>

                            </Menu>
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
                            <Paper style={paperstyle} zDepth={1}>
                                <h1>News</h1>
                                <hr/>
                                {this.renderStatuses()}
                            </Paper>
                        </div>
                        <div className="row">
                            <Paper style={paperstyle} zDepth={1}>
                                <h1>Cities to explore</h1>
                                <hr/>
                                <div style={styles.root}>
                                    <GridList
                                        cellHeight={200}
                                        cols={3}
                                        padding={10}
                                        style={styles.gridList}
                                        >
                                        {tilesData.map(tile => (
                                            <GridTile
                                                key={tile.title}
                                                title={tile.title}
                                                subtitle={<span>{tile.hosts} hosts</span>}
                                                >
                                                <img src={tile.img}/>
                                            </GridTile>
                                        ))}
                                    </GridList>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});