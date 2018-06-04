const knex = require('../../db/knex');
const bcrypt = require('bcrypt-as-promised')

function getAll(){
  return (
    knex('comments')
    // .leftJoin('users', 'user_id', 'users.id')
    .returning('*')
  )
}

function getOne(id){
  return (
    knex('comments')
    .innerJoin('users', 'user_id', 'users.id')
    .where({id})
  )
}

// function checkUser(usersID, cityId){
//   return (
//     knex('comments')
//     .where({ city_id: cityId, user_id: usersId })
//     .first()
//   )
// }

function create(usersID, cityId, title, content){
  console.log(usersID, cityId, title, content)

  // return checkUser(usersID, cityId)
  // .then(data => {
    // if(data) throw { status: 400, message:'User already created city'}
    return (
    knex('comments')
    .insert({user_id: usersID, city_id: cityId, title, content})
    .returning('*')
    )
  // })
}

function update(commentsId, title, content){
  const toUpdate = {}
  if(title){
    toUpdate.title = title
  }
  if(content){
    toUpdate.content = content
  }

  return (
    knex('comments')
    .where({id: commentsId})
    .update(toUpdate)
    .returning('*')
  )
}

function remove(commentsId){
  return (
    knex('comments')
    .where({id: commentsId})
    .del()
    .returning('*')
  )
}

module.exports = {getOne, getAll, create, update, remove}
