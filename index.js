const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({ id, title, type, description, url }) => `
     <div class= 'col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
          <div class='card shadow task__card'>
            <div class= 'card-header d-flex justify-content-end gap-2 task-card-header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)"><i class='fas fa-pencil-alt'></i></button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)"><i class='fas fa-trash-alt'></i></button>
            </div>
            <div class='card-body'>
              ${
                url
                  ? `<img src=${url} alt='card image' class='card-img-top md-3 rounded-md'/>`
                  : `<img src='data:image/jpeg;base64,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' alt='card image' class='img-fluid rounded place_holder_image mb-3'/>`
              }
              <h4 class='card-title'>${title}</h4>
              <p class='card-text text-muted'>${description}</p>
              <div class='tags d-flex flex-wrap'>
               <span class='badge text-white bg-primary m-1'>${type}</span>
              </div>
            </div>
            <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
          </div>
      </div>
`

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
   <div id=${id}>
   ${
    url
      ? `<img src=${url} alt='card image' class='card-img-top md-3 rounded-md'/>`
      : `<img src='data:image/jpeg;base64,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' alt='card image' class='img-fluid rounded place_holder_image mb-3'/>`
  }
      
     <b class='text-sm text-muted'>Created on ${date.toDateString()}</b>
     <h4 class='my-2'>${title}</h4>
     <p class='lead text-muted'>${description}</p>
   </div>
  `
};

const updatelocalstorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if(localStorageCopy) state.taskList = localStorage.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

  const handleSubmit = () => {
  const id = `${Date.now()}`
  const input = {
    url: document.getElementById('imageurl').value,
    title: document.getElementById('TaskTitle').value,
    description: document.getElementById('TaskDescription').value,
    type: document.getElementById('Tags').value,
  };

  if(input.title === ' ' || input.description === ' ' || input.type === ' ') {
    return alert("Please fill out all the necessary fields!");
  }

  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({...input, id, })
  );
  state.taskList.push({...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if(!e) e = window.event;

  const getTask = state.taskList.find(({id}) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

const deleteTask = (e) => {
  if(!e) e = window.event;

  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({id}) => id !== targetID);
  state.taskList = removeTask;

  updateLocalStorage();

  if(type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editTask = (e) => {
  if(!e) e = window.event;

  const targetID = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  }else{
    parentNode = e.target.parentNode.parentNode.parentNode;
};

taskTitle = parentNode.ChildNode[3].ChildNode[3];
taskDescription = parentNode.ChildNode[3].ChildNode[5];
taskType = parentNode.ChildNode[3].ChildNode[7].ChildNode[1];
submitButton = parentNode.ChildNode[5].ChildNode[1];

taskTitle.setAttribute("contenteditable", "true");
taskDescription.setAttribute("contenteditable", "true");
taskType.setAttribute("contenteditable", "true");

submitButton.setAttribute('onclick', "saveEdit.apply(this, arguments)");
submitButton.setAttribute("data-bs-toggle");
submitButton.setAttribute("data-bs-target");
submitButton.innerHTML = "save Changes";

const saveEdit = (e) => {
  if(!e) e = window.event;

  const targetID = e.target.id;
  const parentNode = e.target.parentNode.parentNode;

  const taskTitle = parentNode.ChildNode[3].ChildNode[3];
  const taskDescription = parentNode.ChildNode[3].ChildNode[5];
  const taskType = parentNode.ChildNode[3].ChildNode[7].ChildNode[1];
  const submitButton = parentNode.ChildNode[5].ChildNode[1];

  const updateData = {
    title: taskTitle.innerHTML,
    description: taskDescription.innerHTML,
    type: taskType.innerHTML,
  };

  let stateCopy = state.taskList;

  stateCopy = stateCopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
        }
      : task
  );
  state.taskList = stateCopy;
  updateLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  submitButton.setAttribute('onclick', "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

const searchTask = (e) => {
  if (!e) e = window.event;

  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({ title }) =>
    title.includes(e.target.value)
  );

  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
}
