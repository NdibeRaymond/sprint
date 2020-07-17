(function(){

let taskArray = [];

let tasks = {
 id:"",
 title:"",
 done: false,
}


let toDoButton = document.getElementById("create-to-do-button");
let newToDo = document.getElementById("create-to-do");
let pendingTasks = document.getElementById("pending-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearAll = document.getElementById("clear-all");

render();

clearAll.addEventListener("click",function(){
	pendingTasks.innerHTML = "";
	completedTasks.innerHTML = "";
	taskArray = [];
	render();
});


toDoButton.addEventListener("click",()=>{
	const new_task = Object.assign({},tasks);
	const value = newToDo.value;
	const id = generateID(value);
    
    for(let task of taskArray){
    	if(task.id === id){
    		alert("task already exists");
    		return
    	}
    };

	new_task.title = value;
	new_task.id = id;

	taskArray.push(new_task);

	render();

	newToDo.value = "";
	
});

function generateID(string){
  let hash = 0, char;
  for(let i = 0; i < string.length; i++){
  	char = string.charCodeAt(i);
  	hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }

  return Math.abs(hash);
}

function render(){
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  for(let task of taskArray){
  	if(!task.done){
      pendingTasks.appendChild(createTaskNode(task,false));
  	}
  	else{
      completedTasks.appendChild(createTaskNode(task,true));
  	}
  }


  if(!pendingTasks.innerHTML || !completedTasks.innerHTML){
  	let no_task = "No Task Here";
  	let empty = document.createElement("div");
        empty.innerText = no_task;
    let empty2 = document.createElement("div");
        empty2.innerHTML = no_task;
	  if(!pendingTasks.innerHTML){
	  	pendingTasks.appendChild(empty);
	  }

	  if(!completedTasks.innerHTML){
	  	completedTasks.appendChild(empty2);
	  }
	}
}


function createTaskNode(task,is_done){

	let taskNode = document.createElement("div");
	let taskTitle = document.createElement("h3");
	let done = document.createElement("button");
	let _delete = document.createElement("button");
	let edit = document.createElement("button");	

	taskNode.id = task.id;
	taskTitle.innerText = task.title;

	done.setAttribute("task-id",task.id);
	if(!is_done){
	done.innerText = "done"
    done.addEventListener("click",Done);
	}
	else {
	done.innerText = "undone";
	done.addEventListener("click",Undone);
	}

    edit.setAttribute("task-id",task.id);
    edit.innerText = "edit"
    edit.addEventListener("click",Edit);
    
    _delete.setAttribute("task-id",task.id);
    _delete.innerText = "delete";
    _delete.addEventListener("click",Delete);


    taskNode.appendChild(taskTitle);
    taskNode.appendChild(done);
    taskNode.appendChild(edit);
    taskNode.appendChild(_delete);
    return taskNode;
}

function Done(e){
	for(let task of taskArray){
		if(task.id === Number(e.target.getAttribute("task-id"))){
			task.done = true;
			render();
			break;
		}
	}
}

function Undone(e){
	for(let task of taskArray){
        if(task.id === Number(e.target.getAttribute("task-id"))){
        	task.done = false;
        	render()
        	break;
        }
	}
}

function Edit(e){
	let new_title = prompt("Change task title");

	for(let task of taskArray){
		if(task.title === new_title){
			alert("a task with this name already exists!");
			return;
		}
	}

	for(let task of taskArray){
		if(task.id === Number(e.target.getAttribute("task-id"))){	
			task.title = new_title;
			task.id = generateID(new_title);
			break;
		}
	}

	render();
}

function Delete(e){
	for(let index in taskArray){
		if(taskArray[index].id === Number(e.target.getAttribute("task-id"))){
			taskArray.splice(index,1);
			break;
		}
	}

	render();
}


})()