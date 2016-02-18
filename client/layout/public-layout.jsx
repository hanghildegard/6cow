PublicLayout = React.createClass({
    render(){
        return (
            <div>
                <PublicHeader />
                {this.props.children}
            </div>
        );
    }
});