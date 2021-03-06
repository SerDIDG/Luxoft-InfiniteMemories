cm.define('Com.Sidebar', {
    'modules' : [
        'Params',
        'Events',
        'DataConfig',
        'DataNodes',
        'Storage'
    ],
    'events' : [
        'onRender',
        'onCollapse',
        'onExpand'
    ],
    'params' : {
        'node' : cm.Node('div'),
        'target' : 'document.html',
        'remember' : false
    }
},
function(params){
    var that = this;

    that.nodes = {
        'container': cm.Node('div'),
        'sidebar': cm.Node('div'),
        'button': cm.Node('div')
    };

    that.isExpanded = false;

    /* *** CLASS FUNCTIONS *** */

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataConfig(that.params['node']);
        that.nodes = cm.getNodes()[that.classNameShort];
        render();
    };

    var render = function(){
        cm.addEvent(that.nodes['button'], 'click', toggle);
        // Check toggle class
        that.isExpanded = cm.isClass(that.nodes['sidebar'], 'is-expanded');
        // Check storage
        if(that.params['remember'] && that.storageRead('isExpanded') != null){
            that.isExpanded = that.storageRead('isExpanded');
        }
        // Check sidebars visibility
        if(!cm.inDOM(that.nodes['sidebar']) || cm.getStyle(that.nodes['sidebar'], 'display') == 'none'){
            that.isExpanded = false;
        }
        // Trigger events
        if(that.isExpanded){
            that.expand(true);
        }else{
            that.collapse(true);
        }
        // Trigger render event
        that.triggerEvent('onRender');
    };

    var toggle = function(){
        if(that.isExpanded){
            that.collapse();
        }else{
            that.expand();
        }
    };

    /* ******* MAIN ******* */

    that.collapse = function(isImmediately){
        that.isExpanded = false;
        // Set immediately animation hack
        if(isImmediately){
            cm.addClass(that.nodes['container'], 'is-immediately');
            cm.addClass(that.nodes['sidebar'], 'is-immediately');
            cm.addClass(that.params['target'], 'is-immediately');
        }
        cm.replaceClass(that.nodes['container'], 'is-expanded', 'is-collapsed', true);
        cm.replaceClass(that.nodes['sidebar'], 'is-expanded', 'is-collapsed', true);
        cm.replaceClass(that.params['target'], 'is-sidebar--expanded', 'is-sidebar--collapsed', true);
        // Remove immediately animation hack
        if(isImmediately){
            setTimeout(function(){
                cm.removeClass(that.nodes['container'], 'is-immediately');
                cm.removeClass(that.nodes['sidebar'], 'is-immediately');
                cm.removeClass(that.params['target'], 'is-immediately');
            }, 5);
        }
        // Write storage
        if(that.params['remember']){
            that.storageWrite('isExpanded', false);
        }
        that.triggerEvent('onCollapse');
        return that;
    };

    that.expand = function(isImmediately){
        that.isExpanded = true;
        // Set immediately animation hack
        if(isImmediately){
            cm.addClass(that.nodes['container'], 'is-immediately');
            cm.addClass(that.nodes['sidebar'], 'is-immediately');
            cm.addClass(that.params['target'], 'is-immediately');
        }
        cm.replaceClass(that.nodes['container'], 'is-collapsed', 'is-expanded', true);
        cm.replaceClass(that.nodes['sidebar'], 'is-collapsed', 'is-expanded', true);
        cm.replaceClass(that.params['target'], 'is-sidebar--collapsed', 'is-sidebar--expanded', true);
        // Remove immediately animation hack
        if(isImmediately){
            setTimeout(function(){
                cm.removeClass(that.nodes['container'], 'is-immediately');
                cm.removeClass(that.nodes['sidebar'], 'is-immediately');
                cm.removeClass(that.params['target'], 'is-immediately');
            }, 5);
        }
        // Write storage
        if(that.params['remember']){
            that.storageWrite('isExpanded', true);
        }
        that.triggerEvent('onExpand');
        return that;
    };

    init();
});