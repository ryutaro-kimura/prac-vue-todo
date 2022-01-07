// データはサーバーではなく「ローカルストレージ」へ保存することにする
// https://jp.vuejs.org/v2/examples/todomvc.html
// 一種のライブラリと思えば良い
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
    el: '#app',
    data: {
      todos: []
    },
    methods: {
      // 使用するメソッド
    }
  })