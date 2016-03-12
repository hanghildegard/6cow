AppLayout = React.createClass({
    componentDidMount(){
        Meteor.call("updateLogin");
    },
    render(){
        return (
            <div>
                <AppHeader />
                <div className="content">
                {this.props.children}
                </div>
            </div>
        );
    }
});