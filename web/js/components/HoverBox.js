cm.define('Com.HoverBox', {
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
        'node' : cm.Node('div')
    }
},
function(params){
    var that = this;

    that.nodes = {
        'container': cm.Node('div'),
        'items' : []
    };

    /* *** CLASS FUNCTIONS *** */

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataConfig(that.params['node']);
        that.getDataNodes(that.params['node']);
        render();
    };

    var render = function(){
        cm.forEach(that.nodes['items'], process);
    };

    var process = function(item){
        item = cm.merge({
            'container': cm.Node('div'),
            'icon': cm.Node('div')
        }, item);

        cm.addEvent(item['container'], 'mouseover', function(){
            cm.addClass(item['icon'], 'active');
        });

        cm.addEvent(item['container'], 'mouseout', function(){
            cm.removeClass(item['icon'], 'active');
        });
    };

    /* ******* MAIN ******* */

    init();
});