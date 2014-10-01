cm.define('Com.LayoutFiltered', {
    'modules' : [
        'Params',
        'Events',
        'DataConfig',
        'DataNodes'
    ],
    'events' : [
        'onRender'
    ],
    'params' : {
        'node' : cm.Node('div'),
        'duration' : 300,
        'Com.Togglebox' : {
            'remember' : false
        }
    }
},
function(params){
    var that = this,
        top = 0,
        anim;

    that.components = {};

    that.nodes = {
        'container' : cm.Node('div'),
        'filter' : cm.Node('div'),
        'content' : cm.Node('div'),
        'button' : cm.Node('div')
    };

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataNodes(that.params['node']);
        that.getDataConfig(that.params['node']);
        render();
    };

    var render = function(){
        anim = new cm.Animation(that.nodes['content']);
        // Add Resize Events
        cm.addEvent(window, 'resize', process);
        process();
        // Init Togglebox
        that.components['toggle'] = new Com.ToggleBox(
            cm.merge(that.params['Com.Togglebox'], {
                'node' : that.nodes['container'],
                'nodes' : {
                    'button' : that.nodes['button'],
                    'target' : that.nodes['filter']
                },
                'events' : {
                    'onShowStart' : showFilter,
                    'onHideStart' : hideFilter
                },
                'duration' : that.params['duration']
            })
        );
        that.triggerEvent('onRender');
    };

    var process = function(){
        top = that.nodes['filter'].offsetTop + that.nodes['filter'].offsetHeight;
        if(top != that.nodes['content'].offsetTop){
            that.nodes['content'].style.top = [Math.max(0, top), 'px'].join('');
        }
    };

    var showFilter = function(){
        cm.replaceClass(that.nodes['button'], 'is-hide', 'is-show');
        top = that.nodes['filter'].offsetTop + cm.getRealHeight(that.nodes['filter'], 'offset');
        anim.go({'style' : {'top' : [Math.max(0, top), 'px'].join('')}, 'anim' : 'smooth', 'duration' : that.params['duration']});
    };

    var hideFilter = function(){
        cm.replaceClass(that.nodes['button'], 'is-show', 'is-hide');
        top = that.nodes['filter'].offsetTop;
        anim.go({'style' : {'top' : [Math.max(0, top), 'px'].join('')}, 'anim' : 'smooth', 'duration' : that.params['duration']});
    };

    /* ******* MAIN ******* */

    init();
});