
const pug = require('pug');
const path = require('path');
const ActionTrigger = require('./ActionTrigger');
const Route = require('./Route');

const pugCompileOptions = {
    cache: true,
    doctype: 'html'
}

module.exports = class Controller {

    $beforeAction(){}
    $afterAction(){}

    constructor({ctx, route, router}){
        Object.defineProperties(this, {
            ctx: { value: ctx },
            route: { value: route },
            router: { value: router }
        });
        this.layout = '~layout';
    }
    get request(){
        return this.ctx.request;
    }
    get response(){
        return this.ctx.response;
    }
    get session(){
        return this.ctx.session;
    }
    set session(s){
        this.ctx.session = s;
    }
    get sessionId(){
        return this.ctx.sessionId;
    }
    get cookies(){
        return this.ctx.cookies;
    }
    get query(){
        return this.ctx.query;
    }
    throw(...arg){
        this.ctx.throw(...arg);
    }
    isAjax(){
        return this.ctx.headers['x-requested-with'] === 'XMLHttpRequest'
    }
    renderText(txt){
        this.ctx.body = txt;
    }
    render(model = {}, view){
        const controller = this.route.controller;
        view = view || this.route.action;

        const viewPath = path.resolve(this.route.viewsRoot, `${controller}/${view}.pug`);
        const content = pug.compileFile(viewPath, pugCompileOptions)({
            model
        });

        if(this.layout){
            const layoutPath = path.resolve(this.route.viewsRoot, `${this.layout}.pug`);
            const body = pug.compileFile(layoutPath, pugCompileOptions)({
                model,
                content
            });
            this.ctx.body = body;
        }else{
            this.ctx.body = content;
        }
    }
    renderJSON(json = {}){
        this.ctx.body = json;
    }
    renderSVG(svg){
        this.ctx.body = svg;
        this.ctx.type="image/svg+xml";
    }
    redirect(params, area){
        const url = (typeof params === 'string') ? params : this.router.resolve(params, area);
        this.ctx.redirect(url);
    }
    async rewrite(params, area){
        const route = new Route(params, area);
        const actionTrigger = new ActionTrigger({
            ctx: this.ctx,
            route,
            router: this.router
        });
        await actionTrigger.trigger();
    }
}