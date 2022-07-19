const { json } = require('express')

const Employee = require('../model/Employee')


const getAllEmployees = async (req, res) => {
  const employees = await Employee.find() //return all of the employees
  if (!employees) return res.status(204).json({'message': 'No employees found.'})
  res.json(employees) //sends response back in json form
}

const createNewEmployee = async (req, res)=> {
  //to get parameters from request do... req.body.paramname
  if(!req?.body?.firstname || !req.body?.lastname){ //if it does not have first or last name
    return res.status(400).json({'message': 'First and last names are required'})
  }
  try {
    const result = await Employee.create({
      lastname: req.body.lastname,
      firstname: req.body.firstname
    })
    res.status(201).json(result)
  } catch (err){
    console.log(err)
  }
}

const updateEmployee = async (req, res) => {
  console.log(req.body.id)
  if (!req?.body?.id){
    return res.status(400).json({'message': 'ID parameter is required.'})
  }

  const employee = await Employee.findOne({_id: req.body.id}).exec()

  if(!employee){
    return res.status(204).json({'message': 'No employee matches found.'})
  }
  if(req.body?.firstname) employee.firstname = req.body.firstname
  if(req.body?.lastname) employee.lastname = req.body.lastname
  const result = await employee.save()
  res.json(result)
}

const deleteEmployee = async (req,res)=> {
  if(!req?.body?.id) return res.status(400).json({'message': 'Employee ID required'})

  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if(!employee){
      return res.status(204).json({'message': 'Employee not found.'})
    }
  const result = await employee.deleteOne({
    __id: req.body.id
  })
  res.json(result)
}

const getEmployee = async (req, res)=> {
  if(!req?.params?.id) return res.status(400).json({'message': 'Employee ID required'})
  const employee = await Employee.findOne({_id: req.params.id}).exec()
  if(!employee){
    return res.status(204).json({'message': 'Employee not found.'})
  }
  res.json(employee)
}

module.exports = {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee}