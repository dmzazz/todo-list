const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("duedate");
const form = document.getElementById("form");
const displayTaskContainer = document.getElementById("displayTask");
const activeFilterElement = document.getElementById("active-filter");
const darkModeToggle = document.getElementById("darkModeToggle");

let editTaskId = null; // variable for save id
let filter = "all"; // default filter

// add filter
const filterList = document.querySelectorAll("ul li");
filterList.forEach((item) => {
  item.addEventListener("click", (e) => {
    filter = e.target.getAttribute("data-filter");
    activeFilterElement.textContent = e.target.textContent; // update active title
    displayTasks(filter);
  });
});

// add task
const addTask = (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;

  if (title.trim() === "" && description.trim() === "" && date === "") {
    alert("field cannot be null");
  } else {
    if (editTaskId) {
      updateTask(editTaskId, title, description, date);
    } else {
      // generate unique number ID
      const id = generatorId();

      // create new object task
      const task = {
        id: id,
        title: title,
        description: description,
        date: date,
        completed: false,
        timestamp: Date.now(),
      };

      // convert object task to json string
      const taskData = JSON.stringify(task);

      // save JSON data to localStorage
      localStorage.setItem(id, taskData);
    }

    // clear input fields after submission
    titleInput.value = "";
    descriptionInput.value = "";
    setDefaultDate();

    displayTasks();
  }
};

form.addEventListener("submit", addTask);

// display task
const displayTasks = (filter = "all") => {
  displayTaskContainer.innerHTML = "";

  Object.entries(localStorage).forEach(([key, value]) => {
    const task = JSON.parse(value);

    // filter task by status
    if (filter === "all" || (filter === "pending" && !task.completed) || (filter === "completed" && task.completed)) {
      const taskElement = document.createElement("li");
      taskElement.classList.add("task-item");
      taskElement.innerHTML = `
        <div class="bg-white mt-2 px-5 py-4 rounded-md" data-id="${task.id}">
            <div class="flex flex gap-2">
              <div>
                <input type="checkbox" class="complete-checkbox" ${task.completed ? "checked" : ""} />
              </div>
              <div class="flex-grow">
                <span class="${task.completed ? "line-through" : ""} font-bold">${task.title}</span>
                <li class="text-justify ${task.completed ? "line-through" : ""}">${task.description}</li>
                <li class="text-sm ${task.completed ? "line-through" : ""}"><i class="bi bi-calendar2"></i> ${task.date}</li>
              </div>
              <div>
                <i class="bi bi-pencil-square edit-btn text-xl hover:opacity-50 cursor-pointer"></i>
                <i class="bi bi-trash delete-btn text-xl hover:opacity-50 cursor-pointer"></i>
              </div>
            </div>
        </div>
      `;

      displayTaskContainer.appendChild(taskElement);
    }
  });
};

// eventlistener for button
displayTaskContainer.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("edit-btn")) {
    const taskElement = target.closest("[data-id]");
    const id = taskElement.getAttribute("data-id");
    editTask(id);
  }

  if (target.classList.contains("delete-btn")) {
    const taskElement = target.closest("[data-id]");
    const id = taskElement.getAttribute("data-id");
    deleteTask(id);
  }

  if (target.classList.contains("complete-checkbox")) {
    const taskElement = target.closest("[data-id]");
    const id = taskElement.getAttribute("data-id");
    toggleTaskCompletion(id, target.checked);
  }
});

// edit task
const editTask = (id) => {
  const task = JSON.parse(localStorage.getItem(id));

  if (!task) return;

  // input data task to form
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  dateInput.value = task.date;

  // save id
  editTaskId = id;
};

// update task
const updateTask = (id, title, description, date) => {
  const updatedTask = {
    id: id,
    title: title,
    description: description,
    date: date,
    completed: false,
    timestamp: Date.now(),
  };

  // update data in localStorage
  localStorage.setItem(id, JSON.stringify(updatedTask));

  form.reset();
  editTaskId = null; // reset ID edit

  // refresh window
  displayTasks();
};

const toggleTaskCompletion = (id, completed) => {
  const task = JSON.parse(localStorage.getItem(id));

  if (!task) return;

  task.completed = completed; // update status completed
  localStorage.setItem(id, JSON.stringify(task)); // save updated task back to localStorage

  displayTasks();
};

const deleteTask = (id) => {
  localStorage.removeItem(id);
  displayTasks(); // refresh window
};

// show task
displayTasks();


// ============ //

// function to generate random ID
const generatorId = () => {
  return crypto.randomUUID()
};

// set default date to today
const setDefaultDate = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // format YYYY-MM-DD
  dateInput.value = formattedDate;
};

// set default date when the page loads
setDefaultDate();