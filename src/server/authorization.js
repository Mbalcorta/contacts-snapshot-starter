// options are router-> address to a page
// access a resource(access a page)
// actions

//create a mapping of actions to permissions/roles
var ALL_ROLES = ['regular', 'admin']

var ACTIONS_TO_ROLES = {
  "viewIndex" : ['regular', 'admin'],
  "createContact" : ['admin'],
  "deleteContact" : ['admin']
}

const hasPermissions = (role, action) => {
  const allActions = Object.keys(ACTIONS_TO_ROLES)
  if(!ALL_ROLES.includes(role)){
    throw new Error(`Role '${role}' does not exist!`)
  } else if(!allActions.includes(action)){
    throw new Error(`Action '${action}' does not exist!`)
  } else {
    return  ACTIONS_TO_ROLES[action].includes(role)
  }
}

module.exports = { hasPermissions }