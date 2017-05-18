const path = require('path');
const utils = require('./utils');

module.exports = class Route {
    //_params
    //_area
    //_controllersRoot
    //_viewsRoot
    constructor(params, area = ''){
        this._params = params;
        this._area = area;

        let moduleRoot = utils.appRoot;
        if(area){
            moduleRoot = path.resolve(moduleRoot, `areas/${area}`); 
        }
        this._controllersRoot = path.resolve(moduleRoot, 'controllers');
        this._viewsRoot = path.resolve(moduleRoot, 'views');
    }
    get area(){
        return this._area;
    }
    get controller(){
        return this._params.controller;
    }
    get action(){
        return this._params.action;
    }
    get params(){
        return this._params
    }

    get controllersRoot(){
        return this._controllersRoot;
    }

    get viewsRoot(){
        return this._viewsRoot;
    }
}