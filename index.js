const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.style.width = '100vw';
canvas.style.height = '100vh';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


const enemies = [];

class Enemy{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "transparent";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();
    }
}

document.addEventListener('click', event=>{

});

function spawnEnemies(){
    const x = canvas.width-120;
    const y = canvas.height-160;
    setInterval(()=>{
        const colors = ["purple", "red", "yellow", "green", "blue", "white", "orange", "pink"];
        const randColorsNum = Math.floor(Math.random() * colors.length);
        const randY = Math.random() * y + 60;
        const randX = Math.random() * x + 60;
        enemies.push(new Enemy(randX, randY, 30, colors[randColorsNum]))
        console.log(randColorsNum);
        console.log(colors[randColorsNum])
    }, 1000);
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    enemies.forEach(enemy => {
        enemy.draw();
    });
}

animate();
spawnEnemies();
