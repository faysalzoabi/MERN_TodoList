const express = require('express');
const router = express.Router();
const Item = require('../../models/Todolist');
const auth = require('../../middleware/check-auth');

//Getting all
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
                                .sort({date:-1})
                                .select({_id:1,name:1,date:1,isCompleted:1})
        res.status(200).json(items)
    } catch(err) {
        res.status(500).json({message: err.message})
    }   
})


//Creating One
router.post('/', auth, async (req, res) => {
    const item = new Item({
        name:req.body.name,
        isCompleted:req.body.isCompleted
    })

    try {
        const newitem = await item.save()
        res.status(201).json(newitem)
    }catch(err) {
        res.status(400).json({message: err.message})
    }

  })
    
//Updating One

router.patch('/:id', getItem, async (req, res) => {
    res.item.isCompleted = !res.item.isCompleted
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem)
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})


//Deleting One
router.delete('/:id', auth, getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({message:'Item Deleted'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id)
                         .select({_id:1,name:1,date:1,isCompleted:1})
        if(item === null) {
            return res.status(404).json({message:"Cannot find item"})
        }
    } catch(err) {
            return res.status(500).json({message: err.message})
    }
    res.item = item
    next();
}

module.exports = router;