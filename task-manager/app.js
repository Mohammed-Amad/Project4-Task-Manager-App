
class Task {
  constructor(title, done = false) {
    this.title = title;
    this.done = done;
  }
}


const KEY = "task-manager-v1";

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
   
    return arr.map(t => new Task(t.title, t.done));
  } catch {
    return [];
  }
}


let tasks = load();

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list  = document.getElementById("taskList");


function render() {
  list.innerHTML = "";

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = t.title;
    if (t.done) span.classList.add("done");

    const btns = document.createElement("div");

    const btnDone = document.createElement("button");
    btnDone.className = "btn btn-sm btn-success me-2";
    btnDone.textContent = t.done ? "Undo" : "Done";
    btnDone.onclick = () => {
      t.done = !t.done;
      save();
      render();
    };

    const btnDel = document.createElement("button");
    btnDel.className = "btn btn-sm btn-danger";
    btnDel.textContent = "Delete";
    btnDel.onclick = () => {
      tasks.splice(i, 1);
      save();
      render();
    };

    btns.appendChild(btnDone);
    btns.appendChild(btnDel);
    li.appendChild(span);
    li.appendChild(btns);
    list.appendChild(li);
  });
}


form.onsubmit = (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  tasks.push(new Task(title));
  input.value = "";
  save();
  render();
};


render();
