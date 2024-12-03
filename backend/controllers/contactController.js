const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@router Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res)=> {
    const contacts = await Contact.find({user_id: req.user.id})
    res.json(contacts).status(200)
})

//@desc Create new contacts
//@router POST /api/contacts
//@access private

const createContact = asyncHandler(async (req,res)=> {
    console.log(req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are required")

    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id})
    res.json(contact).status(201)
})

//@desc Get contact
//@router GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req,res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.json(contact).status(200)
})

//@desc Update contact
//@router PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req,res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Unauthorized")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body, {new: true})
    res.json(updatedContact).status(200)
})

//@desc Delete contact
//@router DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req,res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Unauthorized")
    }

    await Contact.deleteOne({
        _id: req.params.id
    })
    res.json(contact).status(200)
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}

