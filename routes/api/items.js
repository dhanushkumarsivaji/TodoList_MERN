const express = require("express")
const router = express.Router()

//Item Modal 
const Item = require('../../modals/Item')


//@route GET api/items
//@desc Get All items
//@access Public

router.get ('/',(req,res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

//@route POST api/items
//@desc Create a post
//@access Public

router.post ('/',(req,res) => {
    const newItem = new Item({
        name:req.body.name
    })

    newItem.save().then(item => res.json(item))
})



//@route DELETE api/items
//@desc Delete an Item
//@access Public

router.delete ('/:id',(req,res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=>res.json({sucsess:true})))
        .catch(err => res.status(404).json({sucsess:false}))
})


module.exports = router;