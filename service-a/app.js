const express = require("express")

const app = express()

const SERVICE_B_URL = "http://127.0.0.1:8081"

app.get("/", async (req, res) => {
    const listeARetourner = [

        { "name": "Service A" }
    ]

    const r = await fetch(`${SERVICE_B_URL}`, {signal : AbortSignal.timeout(5000)})

    for(const item of await r.json()){
        listeARetourner.push(item)
    }
    res.json(listeARetourner)
})

app.listen(8082, "0.0.0.0")