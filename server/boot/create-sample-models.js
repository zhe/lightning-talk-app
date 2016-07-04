module.exports = function (app) {
  app.dataSources.talkDB.automigrate('talk', function (err) {
    if (err) throw err

    app.models.talk.create([
      {title: 'React the good part', description: 'Good part about React.js', username: 'Michael', rating: 0},
      {title: 'React the bad part', description: 'Bad part about React.js', username: 'Michael', rating: 0}
    ], function (err, talks) {
      if (err) throw err

      console.log('Models created: \n', talks)
    })
  })
}
