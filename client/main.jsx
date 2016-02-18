injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    DatePicker
    } = MUI;
var { ThemeManager, LightRawTheme } = Styles;

MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
    getMeteorData() {
        return {
            loggedIn: Meteor.userId()
        }
    },
    renderContent() {
        if (this.data.loggedIn) {
            return (
                <AppLayout>
                    <div className="container" style={{paddingBottom: 0}}>
                        {this.props.content}
                    </div>
                </AppLayout>
            )
        } else {
            return (
                <PublicLayout>
                    <div className="container" style={{paddingBottom: 0}}>
                        {this.props.content}
                    </div>
                </PublicLayout>
            )
        }
    },
    render() {
        return (
            <AppCanvas>
                {this.renderContent()}
                <Footer />
            </AppCanvas>
        )
    }
});