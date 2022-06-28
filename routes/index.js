var express = require('express');
var router = express.Router();

const { createList, getList, deleteList } = require('../controller');

//ROUTE 1: Get all the notes 
router.get('/fetchList', getList)

//ROUTE 2: Create new list
router.post('/createList', createList) 

//ROUTE 3: Delete list
router.delete('/deleteList/:id', deleteList)

module.exports = router;
