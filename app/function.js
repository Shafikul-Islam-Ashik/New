/***
alert function 
**/

const setAlert = (msg, type = 'danger') => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg} <button data-dismiss="alert" class="btn-close"></button></p>`;
}




/***
quantityCheck check function 
**/
const quantityCheck = (value) => {
  let Pattern = /^[0-9]{1,8}$/;
  return Pattern.test(value);
}


/***
price check function 
**/
const priceCheck = (value) => {
  let Pattern = /^[0-9]{1,9}$/;
  return Pattern.test(value);
}




/******************************************
  get all ls data
*******************************************/
const readLsData = (key) => {

  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return false;
  }

}


/******************************************
  function for save data in local storage
*******************************************/

const setLsData = (key, value) => {

  localStorage.setItem(key, JSON.stringify(value));

}


/******************************************
  function for adding data in local storage
*******************************************/

const createLsData = (key, value) => {
  let taskObj;

  //get ls data
  let webTask = JSON.parse(localStorage.getItem(key));


  //let webTask = readLsData(key);


  //create array if !exist 
  if (!webTask) {
    taskObj = [];
  } else {
    taskObj = webTask;
  }

  taskObj.push(value);

  //save data in ls
  localStorage.setItem(key, JSON.stringify(taskObj));

  //setLsData(key, taskObj);
}