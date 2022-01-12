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
    watch: {
      // オプションを使う場合はオブジェクト形式にする
      todos: {
        // 引数はウォッチしているプロパティの変更後の値
        handler: function(todos) {
          todoStorage.save(todos)
        },
        // deep オプションでネストしているデータも監視できる
        deep: true
      }
    },
    methods: {
      // 使用するメソッド
      doAdd: function(event, value) {
        // ref で名前を付けておいた要素を参照
        var comment = this.$ref.comment
        // 入力がなければ何もしないで return
        if (!comment.value.length){
          return
        }
        // { 新しいID, コメント, 作業状態 }
        // というオブジェクトを現在の todos リストへ push
        // 作業状態「state」はデフォルト「作業中=0」で作成
        this.todos.push({
          id: todoStorage.uid++,
          comment: comment.value,
          state: 0
        })
        comment.value = ''
      }
    },
    created() {
      // インスタンス作成時に自動的に fetch() する
      this.todos = todoStorage.fetch()
    }
  })