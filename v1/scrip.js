
//btn and form , those elements here are actually DOM elements, they are also objects 
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".add-form"); //can't upate later
const dashList = document.querySelector(".dashBoard-list");

console.log("hello");

// dashList.innerHTML = ""; //remove everything in factlist in the beginning

btn.addEventListener("click", function () {

    if(form.classList.contains('hidden')){
        form.classList.remove("hidden");
        btn.textContent = "Close";
    }else{
        form.classList.add("hidden");
        btn.textContent = "Add";
    }
});




