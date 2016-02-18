var {
    AppBar,
    FlatButton,
    Dialog,
    Avatar,
    IconMenu,
    MenuItem,
    IconButton,
    MoreVerticon
    } = MUI;


AppHeader = React.createClass({
    goHome(){
        FlowRouter.go("/");
    },
    logout(){
        Meteor.logout();
        FlowRouter.go("/");
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
        let initials = (Meteor.user().profile.firstname[0]+Meteor.user().profile.lastname[0])
        if (Meteor.user().profile.picture)
        {
            avatar=(<Avatar src={Meteor.user().profile.picture} />)
        }
        else
        {
            avatar=(<Avatar>{initials}</Avatar>)
        }

        let iconElementRight = (<div style={{marginTop: -10}}>
            <FlatButton label="Blog" style={{color: "#FFF"}} onTouchTap={this.showBlog}/>
            <FlatButton label="Travel" style={{color: "#FFF"}} onTouchTap={this.showTravel}/>
            <FlatButton label="Forum" style={{color: "#FFF"}} onTouchTap={this.showForum}/>
            <IconMenu
                iconButtonElement={<IconButton>{avatar}</IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                <MenuItem primaryText="Dashboard" />
                <MenuItem primaryText="Profile" />
                <MenuItem primaryText="Messages" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" onTouchTap={this.logout} />
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