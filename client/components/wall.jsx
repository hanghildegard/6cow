let registerSchema = new SimpleSchema({
    firstname: {
        type: String,
        label: "First name",
        max: 100
    },
    lastname: {
        type: String,
        label: "Last name",
        max: 100
    },
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
    },
    gender: {
        type: String,
        allowedValues: ["Male", "Female", "Other"],
        label: "Gender"
    },
    town: {
        type: String,
        label: "Town"
    }

});

Wall = React.createClass({
    register(doc){

        var registrationDoc = {
            email: doc.email,
            password: doc.password,
            profile: {
                firstname: doc.firstname,
                lastname: doc.lastname,
                gender: doc.gender,
                town: doc.town
            }
        }

        Accounts.createUser(registrationDoc, function(err){
            if (err)
            {
                console.log(err);
            }
            else
            {
                FlowRouter.go("/start");
            }
        });
    },
    render() {

        return (
            <div className="wall" style={{paddingBottom: 0, height: 635}}>
                <div className="row" style={{paddingBottom: 0, height: "100%"}}>
                    <div className="col-8" style={{background: 'url(/images/mainpage/rainbowpeople.jpg)', height: "100%", backgroundSize: "cover", paddingBottom: 0}}>
                    </div>
                    <div className="col-4" style={{paddingBottom: 0, paddingRight: 15}} >
                        <Form id="registerform" schema={registerSchema} onSubmit={this.register}>
                            <h1 style={{paddingBottom: 3}}>Join us!</h1>
                            <hr/>
                            <TextInput name="firstname" />
                            <TextInput name="lastname" />
                            <TextInput name="email" />
                            <TextInput name="password" type="password" />
                            <Select name="gender" useAllowedValues />
                            <TextInput name="town" />
                            <SubmitButton label="Register" />
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
});