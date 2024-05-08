function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Por favor, insira uma tarefa!");
        openModalVoid();
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="task-check">
        <span class="task-text" onclick="openMessage(this)">${taskInput.value}</span>
        <button class="edit-btn" onclick="openEditModal(this)">Editar</button>
        <button class="delete-btn" onclick="openDeleteModal(this)">Excluir</button>
    `;
    taskList.appendChild(li);

    taskInput.value = "";
}
function openDeleteModal(btn) {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "block";

    var confirmYes = document.getElementById("confirmYes");
    confirmYes.onclick = function() {
        removeTask(btn);
        closeModal();
    }

    var confirmNo = document.getElementById("confirmNo");
    confirmNo.onclick = function() {
        closeModal();
    }
}

function openDeleteModalSelected() {
    var taskList = document.getElementById("taskList");
    var checkboxes = taskList.querySelectorAll(".task-check:checked");

    if (checkboxes.length === 0) {
        var modal = document.getElementById("NotSelectedModal");
        modal.style.display = "block";
        var confirmNo = document.getElementById("confirmSelected");
        confirmNo.onclick = function() {
            closeModal();
        }
        return;
    }
    var modal = document.getElementById("confirmModalSelected");
    modal.style.display = "block";

    var confirmYes = document.getElementById("confirmYesSelected");
    confirmYes.onclick = function() {
        deleteSelectedTasks();
        closeModal();
    }

    var confirmNo = document.getElementById("confirmNoSelected");
    confirmNo.onclick = function() {
        closeModal();
    }

}
function openModalVoid(){
    var modal = document.getElementById("confirmModalVoid");
    modal.style.display = "block";
    var confirmNo = document.getElementById("confirmOk");
    confirmNo.onclick = function() {
        closeModal();
    }
}
function openEditModal(btn) {
    var modal = document.getElementById("confirmModalEdit");
    modal.style.display = "block";

    var taskText = btn.parentElement.querySelector(".task-text").textContent;
    var editTaskInput = document.getElementById("editTaskInput");
    editTaskInput.value = taskText;

    var confirmEdit = document.getElementById("confirmEdit");
    confirmEdit.onclick = function() {
        updateTask(btn, editTaskInput.value);
        closeModal();
    }

    var cancelEdit = document.getElementById("cancelEdit");
    cancelEdit.onclick = function() {
        closeModal();
    }
}
function openMessage(element) {
    var modal = document.getElementById("confirmModalMessage");
    modal.style.display = "block";
    var messageText = document.getElementById("messageText");
    messageText.textContent = "Tarefa: " + element.textContent;
    var closeMessage = document.getElementById("closeMessage");
    closeMessage.onclick = function() {
        closeModal();
    }
}
function closeModal() {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
}


function removeTask(btn) {
    btn.parentElement.remove();
}
function updateTask(btn, newText) {
    btn.parentElement.querySelector(".task-text").textContent = newText;
}
function searchTask() {
    var input, filter, ul, li, span, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("taskList");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function deleteSelectedTasks() {
    var taskList = document.getElementById("taskList");
    var checkboxes = taskList.querySelectorAll(".task-check:checked");
    checkboxes.forEach(function(checkbox) {
        checkbox.parentElement.remove();
    });
}
