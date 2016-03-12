var {
    Paper,
    Tabs,
    Tab,
    Divider,
    RaisedButton
    } = MUI;

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 5,
        marginBottom: 12,
        fontWeight: 400
    },
    headline3: {
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 400
    },
    bio: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        justifyContent: 'true'
    },
    paper: {
        height: "100%",
        width: "100%",
        marginBottom: 20,
        textAlign: 'left',
        justifyContent: 'true',
        paddingLeft: 15,
        paddingRight: 15,
        display: 'inline-block'
    },
    button: {
        marginLeft: 12,
        marginRight: 12
    }

}

Profile = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var userId = FlowRouter.getParam('userId');

        var user = Meteor.users.findOne({_id: userId});

        if (user) {

            var query = {userid: userId};
            return {
                statuses: Statuses.find(query, {sort: {createdAt: -1}}).fetch(),
                currentUser: user
            }
        }
        else {
            return {}
        }
    },
    renderStatuses(){
        return this.data.statuses.map((status) => {
            return <Status key={status._id} status={status}/>;
        });

    },
    showButtons(){

        if (this.data.currentUser._id === Meteor.userId())
        {
            return (<RaisedButton label="Edit profile" style={styles.button} primary={true} onClick={this.showEdit} />)
        }
        else
        {
            return (<RaisedButton label="Send request" style={styles.button} primary={true}/>)
        }

    },
    showEdit(){
        FlowRouter.go("/editprofile");
    },
    render() {



        var user = this.data.currentUser;

        if (user) {
            var name = user.profile.firstname + " " + user.profile.lastname;
            var location = user.profile.town;
            var accepting = user.profile.accepting;
            var acceptVal = "";
            switch (accepting) {
                case 1:
                    acceptVal = "Accepting guests";
                    break;
                case 2:
                    acceptVal = "Maybe accepting guests";
                    break;
                case 3:
                    acceptVal = "Not accepting guests";
                    break;
                case 4:
                    acceptVal = "Wants to meet up";
                    break;
                default:
                    break;
            }
            var lastLogin = user.profile.lastLogin.toLocaleString();
            var job = "Unemployed";
            if (user.profile.job) {
                job = user.profile.job;
                if (user.profile.workplace) {
                    job += " at " + user.profile.workplace;
                }
            }
            var education = "N/A";
            if (Meteor.user().profile.schools) {
                if (user.schools.length > 0) {
                    education = user.profile.schools[Meteor.user().profile.schools.length - 1];
                }
            }
            var hometown = location;
            if (user.profile.hometown) {
                hometown = user.profile.hometown;
            }
            var gender = user.profile.gender;
            var birthday = "N/A";
            if (user.profile.birthday) {
                birthday = user.profile.birthday.toLocaleString();
            }
            var languages = "N/A";
            if (user.profile.languages) {
                if (user.profile.languages.length > 0) {
                    user.profile.languages.map((language)=> {
                        if (user.profile.languages.indexOf(language) < user.profile.languages.length - 1) {
                            languages += language + ", ";
                        }
                        else {
                            languages += language;
                        }
                    })
                }
            }
            var aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            if (user.profile.aboutMe) {
                aboutMe = user.profile.aboutMe;
            }
            var interests = "N/A";
            if (user.profile.interests) {
                interests = user.profile.interests;
            }

            var visited = "N/A";
            if (user.profile.visitedCountries) {
                if (user.profile.visitedCountries.length > 0) {
                    user.profile.visitedCountries.map((country)=> {
                        if (user.profile.visitedCountries.indexOf(country) < user.profile.visitedCountries.length - 1) {
                            visited += country + ", ";
                        }
                        else {
                            visited += country;
                        }
                    })
                }
            }

            var lived = "N/A";
            if (user.profile.livedCountries) {
                if (user.profile.livedCountries.length > 0) {
                    user.profile.livedCountries.map((country)=> {
                        if (user.profile.livedCountries.indexOf(country) < user.profile.livedCountries.length - 1) {
                            lived += country + ", ";
                        }
                        else {
                            lived += country;
                        }
                    })
                }
            }
            var websites = "N/A";
            if (user.profile.websites) {
                if (user.profile.websites.length > 0) {
                    user.profile.websites.map((site)=> {
                        websites += site + "\n";
                    })
                }
            }

            var guestNumber = 0;
            if (user.profile.guestNumber) {
                guestNumber = user.profile.guestNumber;
            }

            var lastMinute = 0;
            if (user.profile.lastMinute) {
                lastMinute = user.profile.lastMinute;
            }
            var lastMinVal;
            switch (lastMinute) {
                case 0:
                    lastMinVal = "No";
                    break;
                case 1:
                    lastMinVal = "Yes";
                    break;
                default:
                    lastMinVal = "No";
                    break;
            }

            var preferredGender = 2;
            if (user.profile.preferredGender) {
                preferredGender = user.profile.preferredGender;
            }
            var prefGendVal;
            switch (preferredGender) {
                case 0:
                    prefGendVal = "Male";
                    break;
                case 1:
                    prefGendVal = "Female";
                    break;
                case 2:
                    prefGendVal = "Any";
                    break;
                default:
                    prefGendVal = "Any";
                    break;
            }

            var childFriendly = 0;
            if (user.profile.childFriendly) {
                childFriendly = user.profile.childFriendly;
            }

            var childFriendVal;
            switch (childFriendly) {
                case 0:
                    childFriendVal = "No";
                    break;
                case 1:
                    childFriendly = "Yes";
                    break;
                default:
                    childFriendVal = "No";
                    break;
            }

            var petFriendly = 0;
            if (user.profile.petFriendly) {
                petFriendly = user.profile.petFriendly;
            }

            var petFriendVal;
            switch (petFriendly) {
                case 0:
                    petFriendVal = "No";
                    break;
                case 1:
                    petFriendVal = "Yes";
                    break;
                default:
                    petFriendVal = "No";
                    break;
            }

            var smokingAllowed = 0;
            if (user.profile.smokingAllowed) {
                smokingAllowed = user.profile.smokingAllowed;
            }

            var smokeAllVal;
            switch (smokingAllowed) {
                case 0:
                    smokeAllVal = "No";
                    break;
                case 1:
                    smokeAllVal = "Yes";
                    break;
                default:
                    smokeAllVal = "No";
                    break;
            }

            var hasPets = 0;
            if (user.profile.hasPets) {
                petFriendly = user.profile.hasPets;
            }

            var hasPetVal;
            switch (hasPets) {
                case 0:
                    hasPetVal = "No";
                    break;
                case 1:
                    hasPetVal = "Yes";
                    break;
                default:
                    hasPetVal = "No";
                    break;
            }

            var hasChildren = 0;
            if (user.profile.hasChildren) {
                petFriendly = user.profile.hasChildrens;
            }

            var hasChildVal;
            switch (hasChildren) {
                case 0:
                    hasChildVal = "No";
                    break;
                case 1:
                    hasChildVal = "Yes";
                    break;
                default:
                    hasChildVal = "No";
                    break;
            }

            var smoking = 0;
            if (user.profile.smoking) {
                petFriendly = user.profile.smoking;
            }

            var smokeVal;
            switch (smoking) {
                case 0:
                    smokeVal = "No";
                    break;
                case 1:
                    smokeVal = "Yes";
                    break;
                default:
                    smokeVal = "No";
                    break;
            }

            var accessible = 0;
            if (user.profile.accessible) {
                petFriendly = user.profile.accessible;
            }

            var accessVal;
            switch (accessible) {
                case 0:
                    accessVal = "No";
                    break;
                case 1:
                    accessVal = "Yes";
                    break;
                default:
                    accessVal = "No";
                    break;
            }

            var sleepArrangement = 0;
            if (user.profile.sleepArrangement) {
                sleepArrangement = user.profile.sleepArrangement;
            }

            var sleepArrVal;
            switch (sleepArrangement) {
                case 0:
                    sleepArrVal = "Shared bed";
                    break;
                case 1:
                    sleepArrVal = "Shared room";
                    break;
                case 2:
                    sleepArrVal = "Public room";
                    break;
                case 3:
                    sleepArrVal = "Private room";
                    break;
                default:
                    sleepArrVal = "N/A";
                    break;
            }
        }


        return (
            <div className="profile">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <img src="http://lorempixel.com/300/300/people/"/>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <Paper style={styles.paper} zDepth={1}>
                                <div style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 20}}>
                                    <h1>{name}</h1>

                                    <h3>{location}</h3>
                                </div>
                            </Paper>
                        </div>

                        <Paper style={styles.paper} zDepth={1}>
                            <div className="row"
                                 style={{height: '100%', paddingBottom: 20, paddingLeft: 20, display:'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle'}}>

                                <div className="col-9">
                                    <h2>{acceptVal}</h2>
                                    Last login: {lastLogin}
                                </div>
                                <div className="col-3" style={{display: 'flex'}}>
                                    {this.showButtons()}
                                </div>
                            </div>
                        </Paper>

                        <div className="row" style={{marginTop: 10, backgroundColor: "#FFF"}}>
                            <Tabs>
                                <Tab label="About">
                                    <div className="row" style={{paddingLeft: 20}}>
                                        <h2 style={styles.headline}>Overview</h2>

                                    </div>
                                    <Divider />

                                    <div className="row" style={{paddingLeft: 5, paddingTop: 10, paddingBottom: 5}}>
                                        <div className="col-6">
                                            <div className="row">
                                                <Icon icon="briefcase" style={{marginRight: 7}}/>{job}
                                            </div>
                                            <div className="row" style={{marginTop: 10}}>
                                                <Icon icon="school" style={{marginRight: 7}}/>{education}
                                            </div>
                                            <div className="row" style={{marginTop: 10}}>
                                                <Icon icon="map-marker" style={{marginRight: 7}}/>From {hometown}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <Icon icon="gender-transgender" style={{marginRight: 7}}/>{gender}
                                            </div>
                                            <div className="row" style={{marginTop: 10}}>
                                                <Icon icon="cake-variant" style={{marginRight: 7}}/>{birthday}
                                            </div>
                                            <div className="row" style={{marginTop: 10}}>
                                                <Icon icon="message" style={{marginRight: 7}}/>Speaks {languages}
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />

                                    <div className="row" style={{paddingLeft: 20}}>
                                        <h2 style={styles.headline}>About me</h2>

                                    </div>
                                    <Divider />

                                    <div className="row"
                                         style={{paddingTop: 15, paddingLeft: 20, paddingRight: 20, justifyContent: "true"}}>
                                        {aboutMe}
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        <h3 style={styles.headline3}>Interests</h3>
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        {interests}
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        <h3 style={styles.headline3}>Countries I've visited</h3>
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        {visited}
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        <h3 style={styles.headline3}>Countries I've lived in</h3>
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        {lived}
                                    </div>
                                    <div className="row" style={styles.bio}>
                                        <h3 style={styles.headline3}>Websites</h3>
                                    </div>
                                    <div className="row"
                                         style={{paddingTop: 10, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, justifyContent: "true"}}>
                                        {websites}
                                    </div>

                                </Tab>
                                <Tab label="Posts">
                                    {this.renderStatuses()}
                                </Tab>
                                <Tab label="My home">
                                    <div className="row" style={{paddingLeft: 20}}>
                                        <h2 style={styles.headline}>Preferences</h2>
                                    </div>
                                    <Divider />

                                    <div style={{paddingLeft: 20}}>
                                        <div className="row" style={{marginTop: 20}}>
                                            <b>Maximum number of guests:</b> {guestNumber}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Last-minute requests accepted:</b> {lastMinVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Preferred gender to host:</b> {prefGendVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Child friendly:</b> {childFriendVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Pet friendly:</b> {petFriendVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15, marginBottom: 15}}>
                                            <b>Smoking allowed:</b> {smokeAllVal}
                                        </div>
                                    </div>
                                    <Divider />

                                    <div className="row" style={{paddingLeft: 20}}>
                                        <h2 style={styles.headline}>My home</h2>
                                    </div>
                                    <Divider />

                                    <div style={{paddingLeft: 20}}>
                                        <div className="row" style={{marginTop: 20}}>
                                            <b>Has pets:</b> {hasPetVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Has children:</b> {hasChildVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Smoking at home:</b> {smokeVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <b>Wheelchair accessible:</b> {accessVal}
                                        </div>
                                        <div className="row" style={{marginTop: 15, marginBottom: 15}}>
                                            <b>Sleeping arrangements:</b> {sleepArrVal}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab label="Photos">
                                </Tab>
                                <Tab label="References">
                                    <div>
                                        <h2 style={styles.headline}>Tab Three</h2>

                                        <p>
                                            This is a third example tab.
                                        </p>
                                    </div>
                                </Tab>
                                <Tab label="Friends"></Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});