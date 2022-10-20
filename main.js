
const body = document.querySelector('body');
const videoBg = document.querySelector('#video-bg video');
const blockVideo = document.querySelector('#video-bg');
const startBlock = document.querySelector('#start'); 
const startBtn = document.querySelector('#startBtn');
const gameBlock = document.querySelector('#game');
const namePlayer = document.querySelector('#name');
const app = document.querySelector('.app');
const container = document.querySelector('.container');
const gameover = document.querySelector('.over');
const overBtn = document.querySelector('.over button');
const winBtn = document.querySelector('#win button')
const namePl = document.querySelector('.namePl');
const level = document.querySelector('#level');
const bonusDiv = document.querySelector('.bonusDiv');
let countRun = 0;
let interval = 0;
const life = document.querySelector('.life');
const winDiv = document.querySelector('#win');
const scoreSnake = document.querySelector('.score');
const obstaclesDiv = document.querySelector('.obstaclesDiv');
const bonusHeder = document.querySelector('.bonusHeder span');
let score = 0;
let scoreCount = 0;
let speed;
let speedPlus = 0;
let liveCount = 0;

let audioIt = new Audio();
audioIt.src = "./mp3/ring.mp3"
let box = new Audio();
box.src = "./mp3/box.mp3"
// Включаємо відео Відображається сторінка для введення імя Кнопка старт
videoBg.play();
videoBg.onended= function() {
    let count = 0;
    setTimeout(() =>{
        startBlock.style.display = "block"
        let timer = setInterval(()=>{
          startBlock.style.opacity =count + "%";
       count++;
       if(count > 80){
        clearInterval(timer);
   }
        },60);
        
    },60)
    
}
//Клік по кнопці Відкриває ігрове поле Запускає змію
startBtn.addEventListener('click', () =>{
    
    if(namePlayer.value == ''){
        alert('Введіть своє імя');
        
    }
    else{
        blockVideo.style.display = "none";
    startBlock.style.display = "none";
    app.style.display = "block";
    namePl.innerText = namePlayer.value;
    speed = level.value;
    Run(speed);
    addLife(3);
    }
})

function allReset (){
    clearInterval(13);
    winDiv.style.display = 'none';
    blockVideo.style.display = "none";
    startBlock.style.display = "none";
    app.style.display = "block";
    namePl.innerText = namePlayer.value;
    speed = level.value;
    allDelete();
    Run(speed);
    addLife(3);
}
function allDelete(){
    const gameover = document.querySelector('.over');
    let sweets = document.querySelector('.sweets');
    let bonus = document.querySelector('.bonus');
    let zmiya = document.querySelector('.zmiya');
    let obstaclesDiv = document.querySelector('.obstaclesDiv')
    gameover.style.display = "none";
    while(obstaclesDiv.firstChild){
        obstaclesDiv.firstChild.remove();
    }
    while(life.firstChild){
     life.firstChild.remove();
    }
    if(sweets != undefined && sweets != null){
        sweets.remove();
    }
        if( bonus != undefined && bonus != null){
        bonus.remove();
        }
        if( zmiya != undefined && zmiya != null){
     zmiya.remove();
    }
}

//Видаляє нашу змію
function removeSneck(){
    const zmiya = document.querySelector('.zmiya');
    zmiya.remove()
    
}
//Створює змію
function createSneck(){
    let zmiyad = document.createElement('div');
    zmiyad.className = "zmiya";
    container.appendChild(zmiyad);
    for(let i = 0; i<2;i++){
    let sneck =  document.createElement('div');
    sneck.className = "zmiya1";
    zmiyad.appendChild(sneck);
    zmiyad.style.top = 400+'px';
    zmiyad.style.left = 400+'px';
    } 
}

//рух змії

document.addEventListener("keydown", direction);
var run;
let rotate=0;
let runStr = 0;
function direction(event) {
    
	
    if(event.keyCode == 37   ){
        run = "left";
        if(runStr >=360 || runStr <=-360){
            runStr = 0; 
        }
        runStr = runStr-90;
        rotate=rotate-90
        zmiyaRotate(rotate);
        }
    
    else if(event.keyCode == 39){
        run = "right";
        if(runStr >=360){
            runStr = 0; 
        }
        rotate=rotate+90;
        runStr = runStr+90;
        
        zmiyaRotate(rotate);
    }
// 	else if(event.keyCode == 40  && run != "up"){
//     run = "Down";
//     zmiyaRotate(90);
// }
}
//Обмеження руху змії Коли змія торкається кінця екрана Гра закінчується
function zmiyaBom (){
    let zmiya = document.querySelector('.zmiya');
    if( zmiya != undefined  && zmiya != null){
    if(zmiya.offsetLeft > container.clientWidth-160 || zmiya.offsetTop > container.clientHeight-100||zmiya.offsetLeft<10 ||zmiya.offsetTop<120){
        clearInterval(13);
            gamesOver();
    }
    }
}

//Зміна руху змії Вверх вниз
function zmiyaRotate(rotate){
    const zmiya = document.querySelector('.zmiya');
    if(zmiya != undefined){
        zmiya.style.transform = "rotate("+rotate+"deg)";
    }
}

// Створює ігрове поле Бонуси Стіну і т.д.
function Run(speed){
    speedPlus = 150;
    clearInterval(interval);
    createSneck();
    const zmiya = document.querySelector('.zmiya');
    Sweets(randomNamber(1,7));
    Obstacles(15); //зміна кількості перешкод
    Bonus(randomNamber(22,26));
    
    interval = setInterval(()=>{
    setTimeout(()=>{
if(runStr == 270 || runStr == -90 ){
    zmiya.style.top = (zmiya.offsetTop -  50) +  'px' ;
}
 if(runStr == 180 || runStr == -180 ){
    zmiya.style.left = (zmiya.offsetLeft -  50) +  'px' ;
}
if(runStr == 360 || runStr == 0 || runStr == -360){
    zmiya.style.left = (zmiya.offsetLeft + 50) +  'px' ;
}
if(runStr == 90 || runStr == -270){
    zmiya.style.top = (zmiya.offsetTop +  50) +  'px' ;
}

},1200);
    zmiyaBom();
    itSweets();
    itObstacles();
   itBonus();
    },speed);
    
}
//Добавляємо життя змії
    function addLife(howMany){
        for(let i=0;i<howMany;i++){
            liveCount++;
            life.appendChild(document.createElement('span'));
        }
        }
        //Видаляємо життя змії_______________________
        function removeLife(){
            if(life.children.length != 0 ){
            life.lastChild.remove();  
            liveCount--;
            }
                else if(liveCount <= 0){
                    clearInterval(13);
                gamesOver();
            }
        }
        
       //Добавляємо вкусняшки
        function Sweets(randomNamber){
            let sweets =  document.createElement('div');
            sweets.className = "sweets";
                   container.appendChild(sweets);
                   sweets.style.background = "url('./img/"+randomNamber+".png')";
                   sweets.setAttribute("data",randomNamber);
                   sweets.style.width = 40+"px";
                   sweets.style.height = 40 + "px";
                   sweets.style.boxShadow = "10px 5px 5px #233541 ";
                   sweets.style.position = "absolute";
                   sweets.style.top =  (Math.random() * ((container.clientHeight-200) - 150) + 150) + "px";
                   sweets.style.left = (Math.random() * ((container.clientWidth-200) - 140) + 140) +"px";
            } 
            //Провіряємо чи зїла наша змія вкусняшку. Якщо зіла даємо одне очко 
            function itSweets(){
                const zmiya = document.querySelector('.zmiya');
                let sweets = document.querySelector('.sweets');
                if(sweets != undefined && sweets != null && zmiya != undefined && zmiya != null){
                if(sweets.offsetTop >= zmiya.offsetTop-20 && sweets.offsetTop <= zmiya.offsetTop+20 ){
                    if(sweets.offsetLeft <= zmiya.offsetLeft+20 && sweets.offsetLeft >= zmiya.offsetLeft-20){
                    //Провіряєм що зїла змія і відповідно даєм очки за конкретну вкусняшку
                        if(sweets.getAttribute("data") == 1){
                        addScore(1);
                    }
                    else if(sweets.getAttribute("data") == 2){
                        addScore(2);
                    }
                    if(sweets.getAttribute("data") == 3){
                        addScore(3);
                    }
                    if(sweets.getAttribute("data") == 4){
                        addScore(4);
                    }
                    if(sweets.getAttribute("data") == 5){
                        addScore(5);
                    }
                    if(sweets.getAttribute("data") == 6){
                        addScore(6);
                    }
                    if(sweets.getAttribute("data") == 7){
                        addScore(7);
                    }
                    
                    audioIt.play();    
                    sweets.remove();
                    Sweets(randomNamber(1,8));
                }
            }
            }
        }
           //Будуємо перешкоди Можна міняти кількість перешкод
            function Obstacles(count){
                for(let i = 0; i<count;i++){
                let obstacles =  document.createElement('div');
                obstacles.className = "obstacles";
                obstaclesDiv.appendChild(obstacles);
                       obstacles.style.background = "url('./img/11.jpg')";
                       obstacles.style.width = 40+"px";
                       obstacles.style.height = 40 + "px";
                       obstacles.style.boxShadow = "10px 5px 5px #233541";
                       obstacles.style.position = "absolute";
                       obstacles.style.top =  (Math.random() * ((container.clientHeight-200) - 140) + 140) + "px";
                       obstacles.style.left = (Math.random() * ((container.clientWidth-200) - 140) + 140) +"px";
                } 
            }
            // Перевіряємо чи змія попала на перешкоду
                function itObstacles(){
                    let obstaclesDivAll = document.querySelector('.obstaclesDiv');
                    const zmiya = document.querySelector('.zmiya');
                    if(obstaclesDivAll != undefined && zmiya != null ){
                    for(let t of obstaclesDivAll.children){
                    if(t.offsetTop >= zmiya.offsetTop-20 && t.offsetTop <= zmiya.offsetTop+20 ){
                        if(t.offsetLeft <= zmiya.offsetLeft+20 && t.offsetLeft >= zmiya.offsetLeft-20){
                            box.play();
                        t.remove();
                        removeLife();
                        } 
                        }
                    }
                }
                }

                //Cтворюємо наші бонуси
                function Bonus(randomNamber){
                    let bonus =  document.createElement('div');
                    bonus.className = "bonus";
                    bonusDiv.appendChild(bonus);
                    bonus.style.background = "url('./img/"+randomNamber+".png')";
                    bonus.setAttribute("data",randomNamber);
                    bonus.style.width = 40+"px";
                    bonus.style.height = 40 + "px";
                    bonus.style.boxShadow = "10px 5px 5px #233541 ";
                    bonus.style.position = "absolute";
                    bonus.style.top =  (Math.random() * ((container.clientHeight-200) - 180) + 180) + "px";
                    bonus.style.left = (Math.random() * ((container.clientWidth-200) - 140) + 140) +"px";
                    } 
                //Перевіряємо чи змія зловила бонус
                    function itBonus(){
                        let bonusDivAll = document.querySelector('.bonusDiv');
                        const zmiya = document.querySelector('.zmiya');
                        for(let t of bonusDivAll.children){
                        if(t.offsetTop >= zmiya.offsetTop-22 && t.offsetTop <= zmiya.offsetTop+22 ){
                            if(t.offsetLeft <= zmiya.offsetLeft+12 && t.offsetLeft >= zmiya.offsetLeft-20){
                                if(t.getAttribute("data")==22) {
                                    addLife(1);
                                }
                                 else if(t.getAttribute("data")==23){
                                    removeLife();
                                 }
                                
                                t.remove();
                                Bonus(randomNamber(22,26));
                                
                            }
                        }
                    }
                    }
//__________________________________________________________________________//
//Якщо набрано певну кількість очок показувати вікно перемоги В if скоре можем вказати скільки очок потрібно для перемоги
            function addScore(scor){
                score = score+scor;
                scoreSnake.innerText = score;
                scoreCount ++;
                if(scoreCount >10){
                    scoreCount = 0;
                    win(); 
                 }
            }
            
            function win() {
                allDelete();
                clearInterval(13);
                app.style.display = 'none';
                winDiv.style.display = "block";    
                gameover.style.display = "none";
                 gameover.style.opacity = "0";
                
            }

            function gamesOver () {    
                
                    app.style.display = 'none';
                    allDelete();
                       clearInterval(13);
                       scoreCount = 0;
                       score = 0;
                       winDiv.style.display = 'none';
                       gameover.style.opacity = "100";
                       gameover.style.display = "block";
            
            }

            overBtn.onclick = () =>{
                setTimeout(()=>{
                    allReset ();
                },1000)
                
            }
            winBtn.onclick = () =>{
                setTimeout(()=>{
                    allReset ();
                },1000)
            }
//Функція рандомної вибиралки
            function randomNamber(min,max){
                return ( Math.floor(Math.random() * (max - min) + min));
                
            }
            