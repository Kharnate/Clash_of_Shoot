const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.style.width = '100vw';
canvas.style.height = '100vh';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var elemLeft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;

const enemies = [];
let score = 0;
let removeEnemyTimer;

const gameTime = document.getElementById('game-time');
const enemySpawnTime = document.getElementById('spawn-time');
const scoreBoard = document.getElementById("scoreBoard");

function Enemy(x, y, radius, color){
    var enemy = new Path2D();
    enemy.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    return enemy;
}

function spawnEnemies(){
    console.log("timer list: " + gameTime);
    //let spawnTimer = enemySpawnTime.options[enemySpawnTime.selectedIndex].value;
   // console.log("spawn Timer: " + spawnTimer);
    const x = canvas.width - 120;
    const y = canvas.height - 160;
    setInterval(()=>{
        const randY = Math.random() * y + 60;
        const randX = Math.random() * x + 60;
        enemies.push(new Enemy(randX, randY, 30, "white"));
    }, 1000);
}

function enemiesClicked(event){
    var rect = canvas.getBoundingClientRect(),
    x = event.clientX - rect.left, 
    y = event.clientY - rect.top,
    i;

    for(i = enemies.length-1; i >= 0; --i){
        if(ctx.isPointInPath(enemies[i], x, y, "nonzero")){
            console.log("enemy killed")
            enemies.splice(i,1);
            score += 100;
            scoreBoard.innerHTML = score;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i=0; i<enemies.length; i++){
        ctx.fill(enemies[i], "nonzero");
        ctx.stroke(enemies[i], "nonzero");
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    enemies.forEach((enemy) => {
        ctx.stroke(enemy, "nonzero");
        ctx.fill(enemy, "nonzero");
    });
}

animate();
spawnEnemies();
canvas.addEventListener('click', enemiesClicked, false);