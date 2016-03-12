var {
    AppBar,
    FlatButton,
    Dialog,
    Avatar,
    IconMenu,
    MenuItem,
    MoreVerticon
    } = MUI;


AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){

        return {
            currentUser: Meteor.user()
        }
    },
    goHome(){
        FlowRouter.go("/");
    },
    logout(){
        Meteor.logout();
        FlowRouter.go("/");
    },
    showProfile()
    {
        var url = "/profile/"+Meteor.userId();
        FlowRouter.go(url);
    },
    showAccount()
    {

    },
    showForum(){

    },
    showTravel(){

    },
    showBlog(){

    },
    render(){
        var user = this.data.currentUser
        var avatar = (<Avatar style={{cursor: "pointer"}}>"N/A"</Avatar>)
        if (user) {
            let initials = (user.profile.firstname[0] + Meteor.user().profile.lastname[0])
            if (user.profile.picture) {
                avatar = (<Avatar style={{cursor: "pointer"}} src={user.profile.picture}/>)
            }
            else {
                avatar = (<Avatar style={{cursor: "pointer"}}>{initials}</Avatar>)
            }
        }

        let iconElementRight = (<div>

                <FlatButton style={{marginTop: -10}} label="Blog" style={{color: "#FFF"}} onTouchTap={this.showBlog}/>
                <FlatButton style={{marginTop: -10}} label="Travel" style={{color: "#FFF"}} onTouchTap={this.showTravel}/>
                <FlatButton style={{marginTop: -10}} label="Forum" style={{color: "#FFF"}} onTouchTap={this.showForum}/>
            <IconMenu
                iconButtonElement={<IconButton style={{marginRight: 10 }} color="#FFF" icon="message-text" />}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
            </IconMenu>
            <IconMenu
                iconButtonElement={avatar}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem primaryText="Dashboard" onTouchTap={this.goHome}/>
                <MenuItem primaryText="Profile" onTouchTap={this.showProfile}/>
                <MenuItem primaryText="Settings"/>
                <MenuItem primaryText="Sign out" onTouchTap={this.logout}/>
            </IconMenu>

        </div>)

        return (
            <div>
                <AppBar
                    title="6COW"
                    onTitleTouchTap={this.goHome}
                    titleStyle={{cursor: "pointer"}}
                    showMenuIconButton={false}
                    iconElementRight={iconElementRight}
                    />
            </div>
        );
    }
});