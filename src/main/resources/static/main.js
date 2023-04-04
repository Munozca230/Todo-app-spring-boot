$(document).ready(() => {
    console.log('saludos');

    const saveTodo = () => {
        //disable button if there's no description
        const $addTodoBtn = $('#addTodoItem');
        const $descriptionInput = $('#descriptionInput');
        
        $addTodoBtn.prop('disabled', true);

        $descriptionInput.on('input', function() {
            if ($(this).val().trim() === '') {
                $addTodoBtn.prop('disabled', true);
            } else {
                $addTodoBtn.prop('disabled', false);
            }
        });

        $('#addTodoItem').on('click', function (event) {
            event.preventDefault();
            const todoItem = {
                description: $('#descriptionInput').val()
            }

            $.ajax({
                url: 'http://localhost:8080/todo/create-todo',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(todoItem),
                dataType: 'json',
                complete: () => {
                    console.log('todo created');
                    location.reload();
                } 
            });
        });
    }

    const deleteTodo = () => {
        $(document).on('click', '#btnDelete', function (event) {
            event.preventDefault();
            let btn = $(this)[0].parentElement.parentElement;
            const todoId = btn.getAttribute('todoId');
            console.log('todo about to delete: '+todoId);

            $('#deleteTodoItem').on('click', function(event) {
                event.preventDefault();
                $.ajax({
                    url: `http://localhost:8080/todo/delete-todo/${todoId}`,
                    type: 'DELETE',
                    dataType: 'json',
                    complete: () => {
                        console.log('todo deleted');
                        location.reload();
                    }                 
                });
            });
        });
    }

    const editTodo = () => {
        //disable button if there's no description
        const $editTodoBtn = $('#editTodoItem');
        const $descriptionEdit = $('#descriptionEdit');
        
        $editTodoBtn.prop('disabled', true);

        $descriptionEdit.on('input', function() {
            if ($(this).val().trim() === '') {
                $editTodoBtn.prop('disabled', true);
            } else {
                $editTodoBtn.prop('disabled', false);
            }
        });

        $(document).on('click', '#btnEdit', function (event) {
            event.preventDefault();
            let btn = $(this)[0].parentElement.parentElement;
            const todoId = btn.getAttribute('todoId');

            $('#editTodoItem').on('click', function(event) {
                event.preventDefault();
                const descriptionEdit = $('#descriptionEdit').val();
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
                    complete: () => {
                        console.log('todo edited');
                        location.reload();
                    } 
                });
            });
        });
    }

    const completeTodo = () => {

        $(document).on('click', '#btnComplete', function () {
            let btn = $(this)[0].parentElement.parentElement;
            const todoId = btn.getAttribute('todoId');
            const isComplete = btn.getAttribute('todoIsComplete');

            const todoItem = {
                id: todoId,
                isComplete: isComplete
            }
            $.ajax({
                url: `http://localhost:8080/todo/complete-todo/${todoId}`,
                contentType: 'application/json',
                type: 'PUT',
                data: JSON.stringify(todoItem),
                dataType: 'json',
                complete: () => {
                    console.log('todo complete');
                    location.reload();
                } 
            });
        });
    }

    saveTodo();
    deleteTodo();
    editTodo();
    completeTodo();
})
