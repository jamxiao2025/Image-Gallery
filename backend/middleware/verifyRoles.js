const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req?.roles) return res.sendStatus(401)
    const rolesArray = [...allowedRoles]
    console.log(rolesArray)
    console.log(req.roles) 
    //mapping over the roles that are sent thruogh the JWT and comparing them to the roles array that will be passed in 
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)    
    if (!result) return res.sendStatus(401)
    next() //let the route be accessed
  }
}//rest operator pass in as many params as possible
module.exports = verifyRoles