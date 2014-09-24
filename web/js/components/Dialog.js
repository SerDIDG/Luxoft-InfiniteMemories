cm.define('Com.Dialog', {
    'modules' : [
        'Params',
        'Events',
        'DataConfig',
        'DataNodes'
    ],
    'events' : [
        'onRender',
        'onOpen',
        'onClose'
    ],
    'params' : {
        'node' : cm.Node('div'),
        'target' : 'document.html',
        'autoOpen' : false
    }
},
function(params){
    var that = this;

    that.nodes = {
        'container' : cm.Node('div')
    };

    that.isOpen = true;

    /* *** CLASS FUNCTIONS *** */

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataConfig(that.params['node']);
        that.getDataNodes(that.params['node']);
        render();
    };

    var render = function(){
        // Auto open
        that.params['autoOpen'] && that.open();
        // Trigger render event
        that.triggerEvent('onRender');
    };

    var toggle = function(){
        if(that.isOpen){
            that.close();
        }else{
            that.open();
        }
    };

    /* ******* MAIN ******* */

    that.close = function(isImmediately){
        that.isOpen = false;
        // Set immediately animation hack
        if(isImmediately){
            cm.addClass(that.nodes['container'], 'is-immediately');
            cm.addClass(that.params['target'], 'is-immediately');
        }
        cm.replaceClass(that.nodes['container'], 'is-open', 'is-close', true);
        cm.replaceClass(that.params['target'], 'is-dialog--open', 'is-dialog--close', true);
        // Remove immediately animation hack
        if(isImmediately){
            setTimeout(function(){
                cm.removeClass(that.nodes['container'], 'is-immediately');
                cm.removeClass(that.params['target'], 'is-immediately');
            }, 5);
        }
        that.triggerEvent('onClose');
        return that;
    };

    that.open = function(isImmediately){
        that.isOpen = true;
        // Set immediately animation hack
        if(isImmediately){
            cm.addClass(that.nodes['container'], 'is-immediately');
            cm.addClass(that.params['target'], 'is-immediately');
        }
        cm.replaceClass(that.nodes['container'], 'is-close', 'is-open', true);
        cm.replaceClass(that.params['target'], 'is-dialog--close', 'is-dialog--open', true);
        // Remove immediately animation hack
        if(isImmediately){
            setTimeout(function(){
                cm.removeClass(that.nodes['container'], 'is-immediately');
                cm.removeClass(that.params['target'], 'is-immediately');
            }, 5);
        }
        that.triggerEvent('onOpen');
        return that;
    };

    init();
});