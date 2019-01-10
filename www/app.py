# -*- coding: utf-8 -*-

# 当前 webapp 的应用骨架
import logging; logging.basicConfig(level=logging.INFO)

from asyncio import get_event_loop
from aiohttp import web



async def index(request):
	return web.Response(body=b'<h1>welcome WebApp !</h1>', content_type='text/html')




async def init(loop):
	app = web.Application(loop=loop) # 初始化app
	app.router.add_route('GET', '/', index) # 添加路由及其处理函数

	# 创建一个web服务监听指定地址和端口
	srv = await loop.create_server(app.make_handler(), '127.0.0.1', 9000) 

	logging.info('server started at http://127.0.0.1:9000...')

	return srv



loop = get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()

