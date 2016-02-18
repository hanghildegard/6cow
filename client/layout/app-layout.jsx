AppLayout = React.createClass({
    render(){
        return (
            <div>
                <AppHeader />
                {this.props.children}
            </div>
        );
    }
});