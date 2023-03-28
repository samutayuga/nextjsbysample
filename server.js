const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
//const httpProxy=require('http-proxy')

const dev = process.env.NODE_ENV !== 'production'

const hostname = 'localhost'
const port = 4445

const app = next({dev, hostname, port})
const handle = app.getRequestHandler()
//const proxy=new httpProxy.create
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();

app.prepare().then(() => {
        createServer(async (req, res) => {
                try {


                    console.log(`Handling request: ${req.url}`)
                    const parsedUrl = parse(req.url, true)
                    const {pathname, query} = parsedUrl

                    if (pathname === '/a') {
                        await app.render(req, res, '/a', query)
                        // } else if (pathname === '/b') {
                        //     await app.render(req, res, '/b', query)
                    } else if (pathname === '/kubepod') {
                        console.log(`pathname ${pathname}`)
                        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
                        /*k8sApi.listNamespacedPod("session-management").then((res) => {
                            res.body.items.map((aP) => {
                                console.log(aP.metadata.name)
                            })
                        })*/
                    } else {
                        console.log(`pathname: ${pathname} query: ${parsedUrl}`)
                        await handle(req, res, parsedUrl)
                    }

                } catch (err) {
                    console.error('Error occurred handling', req.url, err)
                    res.statusCode = 500
                    res.end('Internal Server error')


                }
            }
        ).listen(port, (err) => {
            if (err) throw  err
            kc.loadFromDefault()

            console.log(`it is not in cluster ${kc.currentContext}`);
            console.log(`> Ready on http://${hostname}:${port}`)
        })
    }
)