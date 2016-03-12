PublicLayout = React.createClass({
    render(){
        return (
            <div>
                <PublicHeader />
                <div className="content">
                {this.props.children}
                </div>
            </div>
        );
    }
});