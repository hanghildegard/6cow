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

PublicHeader = React.createClass({
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
    render(){
        let iconElementRight = (
            <div style={{paddingTop: 6}}>
                <FlatButton label="Log in" style={{color: "#FFF"}} onTouchTap={this.openLoginModal}/>

            </div>
        )

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
            <div>
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
        );
    }
});