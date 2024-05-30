
var bookmarkName = document.getElementById("website");
var webSiteURL = document.getElementById("url");
var tableBody = document.getElementById("table-body");
var boxWarning = document.getElementById("box-warning");

var database = [];

var inputs = {
    website: {
        regex: /^[a-zA-Z]{3,10}$/,
        isValid: false
    },
    url : {
        regex: /^(https:\/\/)?(www\.)?[a-z]{5,10}\.com$/,
        isValid: false
    }
}

if(localStorage.getItem("bookList")){
    database = JSON.parse(localStorage.getItem("bookList"));
    displayData(database);
}

function saveData(){
    var inputData = {
        website: bookmarkName.value,
        url : webSiteURL.value 
    }
    if(validateData()){
        database.push(inputData);  
        localStorage.setItem("bookList",JSON.stringify(database));
        displayData(database);
        resetForm();
    }
    else{
        fireWarning();
    }
}


function validateData(){
    for(var input in inputs){
        if(!inputs[input].isValid) return false;
    }
    return true;
}

function validateOnType(input){
    if(inputs[input.id].regex.test(input.value)){
        console.log("true");
        inputs[input.id].isValid = true;
        input.classList.replace("is-invalid", "is-valid");
    }
    else{
        console.log("false");
        inputs[input.id].isValid = false;
        input.classList.add("is-invalid");
    }
}

function visitUrl(index){
    var url = database[index].url;
    if(url.includes("https")) window.open(url,"_black");
    else window.open("https://"+ url);
    console.log(url);
}

function deleteData(index){
    database.splice(index,1);
    localStorage.setItem("bookList", JSON.stringify(database));
    displayData(database);
}

function displayData(bookList){
    container = '';
    for(var i = 0; i < bookList.length; ++i){
        container +=
        `
        <tr>
            <td>${i + 1}</td>
            <td>${bookList[i].website}</td>
            <td>
                <button onclick="visitUrl(${i})" class="btn btn-success">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </button>
            </td>
            <td>
                <button onclick="deleteData(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }

    tableBody.innerHTML = container;
}

function resetForm(){
    bookmarkName.value = '';
    webSiteURL.value = '';

    for(var input in inputs){
        inputs[input].isValid = false;
        document.getElementById(input).classList.remove("is-valid")
    }
}

function hideWarning(){
    boxWarning.classList.add("d-none");
}

function fireWarning(){
    boxWarning.classList.remove("d-none");
}