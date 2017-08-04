var vm = new Vue({
  el: '#vm',
  data: {
    users: [],
    todos: [],
    selectedUser: '',
    todotoggle: true
  },
  methods: {
      newusers: function (d) {
          this.users = d
      },
      newtodos: function (name) {
        // console.log('hi')
        $.get('/users/' + name + '/tasks', data => {
            this.todos = data
            this.todotoggle = !this.todotoggle
        })
      },
        modifyTodo: function(name, i, method) {
          $.ajax({
              url: `/users/${name}/tasks/${i}`,
              type: method,
            //   dataType: 'json',
            //   data: d,
          }).done(() => {
                if (method == "DELETE")
                    toastr.error('Deleted task!')
                else
                    toastr.info(`Marked as done!!`)
                $.get('/users/' + name + '/tasks', data => {
                    console.log('d', data)
                    this.todos = data
                }).fail(() => {
                    reload()
                    this.selectedUser = ''
                    this.todotoggle = !this.todotoggle
                })
            })
      }
  },
  watch: {
      selectedUser: function (u) {
        $.get('/users/' + u + '/tasks', data => {
            this.todos = data
            this.todotoggle = !this.todotoggle
        })
      }
  }
})

function newtodos2(u) {
    vm.newtodos(u)
}
function reload() {
    $.get('/users', data => {
        // console.log('users', data)
        vm.newusers(data)
    })
}

$(document).ready(() => {
    toastr.options.progressBar = true;
    reload()
    $('#submitbtn').on('click', e => {
        e.preventDefault();
        const user = $('#user')[0].value
        const obj = {
            content: $('#task')[0].value,
            complete: $('#completion').is(':checked'),
        }
        $.post(`/users/${user}/tasks`, obj, data => {
            toastr.success(`Task ${data.content} saved`, 'Added task!')
            reload()
            if (vm.selectedUser == user)
                vm.todos.push(data)
                // vm.newtodos2(user)
            else 
                vm.selectedUser = user
        })
        $('#task')[0].value = ''
    })
})