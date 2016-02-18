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

let loginSchema = new SimpleSchema({
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        max: 60
    },
    password: {
        type: String,
        label: "Password",
        min: 6,
        max: 20
    }

});

Header = React.createClass({
    getInitialState() {
        return {
            loginModalOpen: false
        }
    },
    goHome(){
        FlowRouter.go("/");
    },
    openLoginModal(){
        this.setState({
            loginModalOpen: true
        })
    },
    closeLoginModal(){
        this.setState({
            loginModalOpen: false
        })
    },
    login(doc){
        Meteor.loginWithPassword(doc.email, doc.password, (err) => {
            if (err) {
                console.log(err);
            }
            else {

                this.closeLoginModal();
                FlowRouter.go("/start");

            }
        });
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
    render() {

        let iconElementRight;
        let avatar;


        if (!Meteor.userId()) {
            iconElementRight = (
                <div style={{paddingTop: 6}}>
                    <FlatButton label="Log in" style={{color: "#FFF"}} onTouchTap={this.openLoginModal}/>

                </div>
            )
        }
        else {
            let initials = (Meteor.user().profile.firstname[0]+Meteor.user().profile.lastname[0])
            if (Meteor.user().profile.picture)
            {
                avatar=(<Avatar src={Meteor.user().profile.picture} />)
            }
            else
            {
                avatar=(<Avatar>{initials}</Avatar>)
            }
            iconElementRight = (<div style={{paddingTop: 0}}>
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
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Sign out" onTouchTap={this.logout} />
                </IconMenu>

            </div>)
        }

        let actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.closeLoginModal}
                />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.refs.loginform.submit()}}
                />
        ]

        return (
            <div className="header">
                <AppBar
                    title="6COW"
                    onTitleTouchTap={this.goHome}
                    titleStyle={{cursor: "pointer"}}
                    showMenuIconButton={false}
                    iconElementRight={iconElementRight}
                    />
                <Dialog
                    title="Log in"
                    actions={actions}
                    modal={false}
                    open={this.state.loginModalOpen}
                    onRequestClose={this.closeLoginModal}
                    >
                    <Form id="loginform" schema={loginSchema} onSubmit={this.login} ref="loginform">
                        <TextInput name="email"/>
                        <TextInput name="password" type="password"/>
                    </Form>
                </Dialog>
            </div>
        )
    }
})


