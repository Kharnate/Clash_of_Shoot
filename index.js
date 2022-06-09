const circles = [];

const game = () =>{
    const parent = document.querySelector(".parent-div");
    console.log(parent.getBoundingClientRect());
    setInterval(function(){
        createCircle(parent);
    }, 500);
}

function createCircle(parent){

    const newCircle = document.createElement('div');
    newCircle.style.borderRadius = "50%";
    newCircle.style.height = "3em";
    newCircle.style.width = "3em";
    newCircle.style.border = ".25em solid white";
    newCircle.style.background = "transparent";
    newCircle.style.position = "relative";
    newCircle.classList.add("new-circle");

    var parentInfo = parent.getBoundingClientRect();
    var top = Math.floor(Math.random() * (parent.offsetHeight - 20)) + 5;
    var left = Math.floor(Math.random() * (parent.offsetWidth-20)) + 5;
    console.log("Height: " + parent.clientHeight + " width: " + parent.offsetWidth)
    newCircle.style.top = top + "px";
    newCircle.style.left = left + "px";
    newCircle.style.right = "10px;"
    newCircle.style.bottom = "10px;"
    newCircle.style.zIndex = (Math.random() * 999999)

    circles.push(newCircle);
    parent.appendChild(newCircle);
}

document.addEventListener("click", function(){
    for (let i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', ()=>{
            circles[i].remove();
        })
    }
});

game();

