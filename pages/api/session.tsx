export default function handler(req, res) {
    const { pid } = req.query

    if (req.method === 'POST') {

    } else {
        res.end(`Post ${pid}`)
       // res.status(200).json({name: 'Hello'})
    }

}