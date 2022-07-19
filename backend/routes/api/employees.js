const express = require('express')
const router = express.Router()
const path = require('path')
const employeesController = require('../../controllers/employeesController')
//It seems that controllers have made this routing more neat.
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

//params are the only allowed roles
router.route('/')
  .get(employeesController.getAllEmployees) //go through middleware first, then employees Controller
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee)

  //Get request that has parameter inside the URL
router.route('/:id')
  .get(employeesController.getEmployee)
module.exports = router