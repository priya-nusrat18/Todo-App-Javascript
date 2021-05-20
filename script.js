//all require elemnets
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
inputBox.onkeyup = () =>{
    let userData = inputBox.value;
    if (userData.trim() != 0) {
		//if user value aren't only space
		addBtn.classList.add("active"); //active add btn
	} else {
		addBtn.classList.remove("active"); 
	}
}
     showTasks();

//if user click add button
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage =localStorage.getItem('New Todo'); //getting localStorage
    if (getLocalStorage == null) {
        listArr = [];
	}else{
		listArr = JSON.parse(getLocalStorage); // transforming  json string into a  js objcet
	}
    listArr.push(userData);
    localStorage.setItem('New Todo', JSON.stringify(listArr)); // transforming js objcet into a json string
     showTasks();
}
// task add inside ul
function showTasks () {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
	if (getLocalStorage == null) {// if local storagenull
		listArr = [];// creating blank array
	} else {
		listArr = JSON.parse(getLocalStorage); // transforming  json string into a  js objcet
	}
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent =listArr.length;//passing the length value in pendingNum

    if (listArr.length > 0) {
		//if array length is greater than 0
		deleteAllBtn.classList.add("active"); //active the delete button
	} else {
		deleteAllBtn.classList.remove("active"); //unactive the delete button
	}
    let newLiTag = ' ';
    listArr.forEach((element, index) => {
		newLiTag += `<li>${element} <span onclick='deleteTask(${index})'><i class="fa fa-trash"></i></span> </li>`;
	});
    todoList.innerHTML = newLiTag;
    inputBox.value = ' '; // once  task added leave input feild blank
}
//dlete task function t
function deleteTask(index) {
	let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1)//remove or delete the particuler indexed li
    //after remove li again update localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js objcet into a json string
	showTasks();
}
//delete all tasks
deleteAllBtn.onclick=() =>{
    listArr = [];
    //after delte al ltask again update localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js objcet into a json string
	showTasks();
}