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
        'onClose',
        'onMaximize',
        'onRestore'
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
        'container' : cm.Node('div'),
        'window' : cm.Node('div'),
        'close' : cm.Node('div'),
        'maximize' : cm.Node('div')
    };

    that.isOpen = true;
    that.isMaximize = false;

    /* *** CLASS FUNCTIONS *** */

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataConfig(that.params['node']);
        that.getDataNodes(that.params['node']);
        render();
    };

    var render = function(){
        cm.addEvent(that.nodes['container'], 'click', function(e){
            var target = cm.getEventTarget(e);
            if(!cm.isParent(that.nodes['window'], target, true)){
                that.close();
            }
        });
        cm.addEvent(that.nodes['close'], 'click', function(){
            that.close();
        });
        cm.addEvent(that.nodes['maximize'], 'click', function(){
            that.toggleMaximize();
        });
        // Auto open
        that.params['autoOpen'] && that.open();
        // Trigger render event
        that.triggerEvent('onRender');
    };

    var windowClickEvent = function(e){
        e = cm.getEvent(e);
        if(e.keyCode == 27){
            that.close();
        }
    };

    var methodWrapper = function(isImmediately, handler){
        if(isImmediately){
            cm.addClass(that.nodes['container'], 'is-immediately');
            cm.addClass(that.params['target'], 'is-immediately');
        }
        handler(isImmediately);
        // Remove immediately animation hack
        if(isImmediately){
            setTimeout(function(){
                cm.removeClass(that.nodes['container'], 'is-immediately');
                cm.removeClass(that.params['target'], 'is-immediately');
            }, 5);
        }
    };

    /* ******* MAIN ******* */

    that.close = function(isImmediately){
        methodWrapper(isImmediately, function(){
            that.isOpen = false;
            cm.removeEvent(window, 'keydown', windowClickEvent);
            cm.replaceClass(that.nodes['container'], 'is-open', 'is-close', true);
            cm.replaceClass(that.params['target'], 'is-dialog--open', 'is-dialog--close', true);
            that.triggerEvent('onClose');
        });
        return that;
    };

    that.open = function(isImmediately){
        methodWrapper(isImmediately, function(){
            that.isOpen = true;
            cm.addEvent(window, 'keydown', windowClickEvent);
            cm.replaceClass(that.nodes['container'], 'is-close', 'is-open', true);
            cm.replaceClass(that.params['target'], 'is-dialog--close', 'is-dialog--open', true);
            that.triggerEvent('onOpen');
        });
        return that;
    };

    that.maximize = function(isImmediately){
        methodWrapper(isImmediately, function(){
            that.isMaximize = true;
            cm.replaceClass(that.nodes['container'], 'is-normal', 'is-maximize', true);
            cm.replaceClass(that.params['target'], 'is-dialog--normal', 'is-dialog--maximize', true);
            that.triggerEvent('onMaximize');
        });
        return that;
    };

    that.restore = function(isImmediately){
        methodWrapper(isImmediately, function(){
            that.isMaximize = false;
            cm.replaceClass(that.nodes['container'], 'is-maximize', 'is-normal', true);
            cm.replaceClass(that.params['target'], 'is-dialog--maximize', 'is-dialog--normal', true);
            that.triggerEvent('onMaximize');
        });
        return that;
    };

    that.toggleMaximize = function(isImmediately){
        if(that.isMaximize){
            that.restore(isImmediately);
        }else{
            that.maximize(isImmediately);
        }
    };

    init();
});