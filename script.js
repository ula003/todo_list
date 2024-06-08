const add_section = document.querySelector('.add_section');
let sections = JSON.parse(localStorage.getItem('sections')) || [];

reload(sections);

function reload(arr) {
    const sectionsContainer = document.querySelector('.sections');
    sectionsContainer.innerHTML = '';

    arr.forEach((elem) => {
        sectionsContainer.innerHTML += `
            <div class="section" id="${elem.id}">
                <div class="name">
                    <h3>${elem.name}</h3>
                    <div class="count">${elem.todos.length}</div>
                </div>
                <div class="todos">
                    ${reloadTodo(elem.todos)}
                </div>
                <button class="add_todo">Add todo</button>
                <button class="remove_section">Remove section</button>
            </div>
        `;
    });

    document.querySelectorAll('.add_todo').forEach((add_todo) => {
        add_todo.onclick = () => {
            const todo_name = prompt('Name of the todo: ');
            const section_id = +add_todo.parentNode.id;
            const section = sections.find((elem) => elem.id === section_id);

            if (todo_name) {
                section.todos.push({
                    id: Math.random(),
                    isDone: false,
                    time: new Date().toISOString(),
                    name: todo_name
                });

                localStorage.setItem('sections', JSON.stringify(sections));
                reload(sections);
            }
        };
    });

    document.querySelectorAll('.remove_section').forEach((remove_section) => {
        remove_section.onclick = () => {
            const section_id = +remove_section.parentNode.id;
            sections = sections.filter((elem) => elem.id !== section_id);
            localStorage.setItem('sections', JSON.stringify(sections));
            reload(sections);
        };
    });

    document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.onchange = () => {
            const todo_id = +input.parentNode.parentNode.id;
            const section_id = +input.closest('.section').id;
            const section = sections.find((elem) => elem.id === section_id);
            const todo = section.todos.find((elem) => elem.id === todo_id);

            todo.isDone = input.checked;

            localStorage.setItem('sections', JSON.stringify(sections));
        };
    });

    document.querySelectorAll('.delete').forEach((del) => {
        del.onclick = () => {
            const todo_id = +del.parentNode.parentNode.id;
            const section_id = +del.closest('.section').id;
            const section = sections.find((elem) => elem.id === section_id);

            section.todos = section.todos.filter((elem) => elem.id !== todo_id);

            localStorage.setItem('sections', JSON.stringify(sections));
            reload(sections);
        };
    });
}

add_section.onclick = () => {
    const name = prompt('Name of the section: ');

    if (name) {
        sections.push({
            id: Math.random(),
            name: name,
            todos: []
        });

        localStorage.setItem('sections', JSON.stringify(sections));
        reload(sections);
    }
};

function reloadTodo(arr) {
    return arr.map((elem) => `
        <div class="todo" id="${elem.id}">
            <div class="left__side">
                <input type="checkbox" ${elem.isDone ? 'checked' : ''}>
                <div class="title">
                    <h4>${elem.name}</h4>
                    <span class="date">${new Date(elem.time).toLocaleString()}</span>
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M360-200q-20 0-37.5-9T294-234L120-480l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H360Zm400-80v-400 400Zm-400 0h400v-400H360L218-480l142 200Zm96-40 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z" />
                </svg>
                <svg class="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </div>
        </div>
    `);
}