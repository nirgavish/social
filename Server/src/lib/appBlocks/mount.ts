export function Mount(app, controllers) {
    controllers.forEach((c) => {

        console.log(c.controller.constructor.name);

        if (c.controller.get) {
            console.log(c.route + "[get/:id]");
            app.get(c.route + "/:id", (req, res) => c.controller.get(req, res));
        }
        if (c.controller.list) {
            console.log(c.route + "[get]");
            app.get(c.route, (req, res) => c.controller.list(req, res));
        }
        if (c.controller.post) {
            console.log(c.route + "[post]");
            app.post(c.route, (req, res) => c.controller.post(req, res));
        }
        if (c.controller.patch) {
            console.log(c.route + "[patch]");
            app.patch(c.route, (req, res) => c.controller.patch(req, res));
        }
        if (c.controller.delete) {
            console.log(c.route + "[delete/:id]");
            app.delete(c.route + "/:id", (req, res) => c.controller.delete(req, res));
        }
        if (c.controller.routes) {
            c.controller.routes.forEach((route) => {
                console.log(c.route + "/" + route.path + "[" + route.method + "]");
                app[route.method](c.route + "/" + route.path, (req, res) => c.controller[route.functionName](req, res));
            });
        }

    });
}
