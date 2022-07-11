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

let removeEnemyWithTime;
let spawnEnemyWithTime;
let enemyRemoveTime;
let enemySpawnTime;

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
    const x = canvas.width - 120;
    const y = canvas.height - 160;
    gameSettings();

    spawnEnemyWithTime = setInterval(()=>{
        const randY = Math.random() * y + 60;
        const randX = Math.random() * x + 60;
        enemies.push(new Enemy(randX, randY, 30, "white"));
        gameOver();
    }, enemySpawnTime);

    removeEnemyWithTime = setInterval(removeEnemies, enemyRemoveTime);
}

function gameSettings(){
    alert("Game Rules:\n\n1. Enter information according to your skills.\n2. Click all enemies before it disappears.\n3. If clicked before it disappears, you score +10 or else -5.\n4. The game will run till you complete 1000 points or go below 0.\n5. Good Luck!");
    enemySpawnTime = prompt("Enemy spawn time in ms:", 1000)
    enemyRemoveTime = prompt("Time before enemy disappears in ms:", 5000)
}

function gameOver(){
    if(score >= 1000){
        alert("GAME OVER, YOU WIN !!");
    } else if(score <0){
        alert("GAME OVER, YOU LOST.\nMaybe try with higher settings.");
    }
     location.reload();
     clearInterval(removeEnemyWithTime);
     clearInterval(spawnEnemyWithTime);
}

function enemiesClicked(event){
    var rect = canvas.getBoundingClientRect(),
    x = event.clientX - rect.left, 
    y = event.clientY - rect.top,
    i;

    for(i = enemies.length-1; i >= 0; --i){
        if(ctx.isPointInPath(enemies[i], x, y, "nonzero")){
            clearInterval(removeEnemyWithTime);
            enemies.splice(i,1);
            score += 10;
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

function removeEnemies(){
    enemies.splice(0,1);
    score -= 5;
    scoreBoard.innerHTML = score;
}

animate();
spawnEnemies();
canvas.addEventListener('click', enemiesClicked, false);
