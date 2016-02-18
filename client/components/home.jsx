Home = React.createClass({
    render() {
        var content = <Wall />;
        if (Meteor.userId()) {
            content = <Welcome />;
        }

        return content;
    }
});