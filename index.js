const game = () =>{
    const parent = document.querySelector(".parent-div");

    setInterval(function(){
        addElement(parent);
    }, 1000);
}

function addElement(parent){
    const newDiv = document.createElement('div');
    newDiv.style.borderRadius = "50%";
    newDiv.style.height = "4em";
    newDiv.style.width = "4em";
    newDiv.style.border = "5px solid white";
    newDiv.style.background = "transparent";
    newDiv.style.position = "relative";

    var parentInfo = parent.getBoundingClientRect();
    
    var top = Math.floor(Math.random() * parentInfo.height) + 1;
    var left = Math.floor(Math.random() * parentInfo.width) + 1;

    newDiv.style.top = top + "px";
    newDiv.style.left = left + "px";

    parent.appendChild(newDiv);
    console.log("count");

}


game();
