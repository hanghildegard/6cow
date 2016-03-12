IconButton = React.createClass({
    _navigateTo() {
        if (this.props.onTouchTap) {
            this.props.onTouchTap();
        }
        FlowRouter.go(this.props.href)
    },
    _iconClassName: function () {
        var className = "mdi mdi-" + this.props.icon + " ";

        if (this.props.iconClassName) {
            className += this.props.iconClassName;
        }
        return className;
    },
    render: function() {
        var iconStyle = {};
        var tooltip;

        if (this.props.iconStyle) {
            _.extend(iconStyle, this.props.iconStyle);
        }

        if (this.props.color) {
            iconStyle.color = this.props.color;
        }

        if (this.props.tooltip) {
            tooltip = TAPi18n.__(this.props.tooltip);
        }

        let onTouchTap = this.props.onTouchTap;

        if (this.props.href) {
            onTouchTap = this._navigateTo;
        }

        return (
            <MUI.IconButton tooltipPosition="top-center" {...this.props} iconStyle={iconStyle} iconClassName={this._iconClassName()} tooltip={tooltip} onTouchTap={onTouchTap}>{this.props.children}</MUI.IconButton>
        )
    }
});