FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, { content: <Home /> });
    }
});

var appGroup = FlowRouter.group({
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            redirect("/");
        }
    }],
    name: "app"
});

appGroup.route('/start', {
    action() {
        ReactLayout.render(MainLayout, { content: <Welcome /> });
    }
});