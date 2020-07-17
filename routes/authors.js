const express = require('express');

const router = express.Router();
const Author = require('../models/author')

//  All Author route
router.get('/', async (req, res) =>{
    let searchOptions ={};
    if(req.query.name !== null && req.query.name !== '') {      // req.query is used bcoz it a get request
        searchOptions.name =new RegExp(req.query.name, 'i');  // regular expression passed with i flag for case-insensitive search
    }
    try {
        const auth = await Author.find(searchOptions);
        res.render('authors/index',{
            authors:auth, 
            searchOptions:req.query
        })

    } catch{
        // console.log("Mongo error",err)
        res.redirect('/')
    }
    res.render('authors/index')
})

//  New Author route
router.get ('/new', (req, res) =>{
    res.render('authors/new', {author: new Author()})
})

//  Create Author route
router.post ('/', async (req, res) =>{
    const author = new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    }
    catch(err) {
            res.render('authors/new', {
                author: author,
                errorMessage:`error creating new author ${err}`
            })
    }
})
module.exports = router