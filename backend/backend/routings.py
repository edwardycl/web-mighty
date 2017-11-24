from channels.routing import route


channel_routings = [
    route('websocket.connect', 'websocket.consumers.multiplexer.websocket_connect'),
    route('websocket.receive', 'websocket.consumers.multiplexer.websocket_receive'),
    route('websocket.disconnect', 'websocket.consumers.multiplexer.websocket_disconnect'),
]
