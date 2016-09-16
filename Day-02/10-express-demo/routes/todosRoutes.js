var express = require('express');
var router = express.Router();


var todoList = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todos/list', {list : todoList});
});

router.get('/new', function(req, res, next){
	res.render('todos/new');
});

router.post('/new', function(req, res, next){
	var todoName = req.body.todoName,
		newTodoId = todoList.reduce(function(result, todo){
			return result > todo.id ? result : todo.id;
		}, 0) + 1;
	var newTodo = {
		id : newTodo,
		name : todoName,
		isCompleted : false
	};
	todoList.push(newTodo);
	res.redirect('/todos');
});

router.get('/toggle/:id', function(req, res, next){
	var todo = todoList.filter(function(item){
		return item.id === parseInt(req.params.id);
	})[0];
	if (todo)
		todo.isCompleted = !todo.isCompleted;
	res.redirect('/todos');
});

module.exports = router;