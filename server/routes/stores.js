const express = require('express');
const StoresRouter = express.Router();
let stores = require('../db/stores.json');

StoresRouter.get('/', async (req, res) => {
    res.json(stores);
});

StoresRouter.get('/:store_id', async(req, res) =>{
    let {store_id} = req.params;
    let store = stores.find((s)=>s.id == store_id);
    if(store)
        res.json(store);
    else
        res.json({"msg":"store was not found!"});
});

StoresRouter.get('/:store_id/:item_id', async(req, res) =>{
    let {store_id, item_id} = req.params;
    let store = stores.find((s)=>s.id == store_id);
    let item = store.items.find((i)=>i.id == item_id);
    if(item)
        res.status(200).json(item);
    else
        res.status(404).json({"msg":"item was not found!"});
});

StoresRouter.post('/add', async(req, res)=>{
    try{
        let {id, name, city, items} = req.body;
        let store = {
                "id": id,
                "name": name,
                "city": city,
                "items": items
            };
        stores.push(store);
        const fs = require('node:fs');
        const path = require('node:path');
        fs.writeFile(path.join(__dirname, '..', 'db', 'stores.json'), JSON.stringify(stores), ()=>{});
        res.status(201).json(stores);
    }
    catch(error){
        console.log({error});
    }
});

StoresRouter.post('/:store_id/add', async(req, res) =>{
    let {store_id} = req.params;
    let {id, name, regularPrice, salePrice} = req.body;
    let store = stores.find((s)=>s.id == store_id);
    let item = {
        "id": id,
        "name": name,
        "regularPrice": regularPrice,
        "salePrice": salePrice
    };
    store.items.push(item);
    const fs = require('node:fs');
    const path = require('node:path');
    fs.writeFile(path.join(__dirname, '..', 'db', 'stores.json'), JSON.stringify(stores), () =>{});
    res.status(201).json(stores);
});

module.exports = StoresRouter;