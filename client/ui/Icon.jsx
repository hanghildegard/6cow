Icon = React.createClass({
    render: function () {
        return (
            <MUI.FontIcon className={"mdi mdi-" + this.props.icon} {...this.props} />
        )
    }
});