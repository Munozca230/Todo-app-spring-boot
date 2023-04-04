$(document).ready(() => {
    console.log('saludos');

    const saveTodo = () => {
        $('#addTodoItem').on('click', function () {
            const todoItem = {
                description: $('#descriptionInput').val()
            }

            $.ajax({
                url: 'http://localhost:8080/todo/create-todo',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(todoItem),
                dataType: 'json',
                success: () => console.log('todo created')
            });

        });
    }

    const deleteTodo = () => {
        $(document).on('click', '#btnDelete', function (event) {
            event.preventDefault();
            let btn = $(this)[0].parentElement.parentElement;
            const todoId = btn.getAttribute('todoId');
            console.log('todo about to delete: '+todoId);

            $('#deleteTodoItem').on('click', function() {
                $.ajax({
                    url: `http://localhost:8080/todo/delete-todo/${todoId}`,
                    type: 'DELETE',
                    dataType: 'json',
                    success: () => console.log('todo deleted')
                });
            });
        });
    }

    const editTodo = () => {
        $(document).on('click', '#btnEdit', function (event) {
            event.preventDefault();
            let btn = $(this)[0].parentElement.parentElement;
            const todoId = btn.getAttribute('todoId');

            $('#editTodoItem').on('click', function(event) {
                const descriptionEdit = document.getElementById("descriptionEdit").value;
                const todoItem = {
                    id: todoId,
                    description: descriptionEdit
                }
                $.ajax({
                    url: `http://localhost:8080/todo/edit-todo/${todoId}`,
                    contentType: 'application/json',
                    type: 'PUT',
                    data: JSON.stringify(todoItem),
                    dataType: 'json',
                    success: () => console.log('todo deleted')
                });
            });
        });
    }

    saveTodo();
    deleteTodo();
    editTodo();
})
