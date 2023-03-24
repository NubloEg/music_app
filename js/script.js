let number_sound=1;
let audio=new Audio(`/music/${number_sound}.mp3`);
let audio_old;
let sound={
    1:{
    image:'/img/splin.jpg',
    text:['Возьми себя в руки, дочь самурая! Возьми себя в руки. Становятся тихими звуки от края до края.',
    'Возьми себя в руки, дочь самурая! Возьми себя в руки. От края до края становятся тихими звуки.',
        'Я буду смеяться до тех пор, пока не взорвётся моя голова. Я буду смеяться пока голова не взорвётся.',
       'Я буду смеяться до тех пор пока не взорвётся моя голова. На океаны и острова.'],
       duration:'216'
    },
    2:{
        image:'/img/kaj.jpg',
        text:['Возьми себя в руки, дочь самурая! Возьми себя в руки. Становятся тихими звуки от края до края.',
        'Возьми себя в руки, дочь самурая! Возьми себя в руки. От края до края становятся тихими звуки.',
            'Я буду смеяться до тех пор, пока не взорвётся моя голова. Я буду смеяться пока голова не взорвётся.',
            'Я буду смеяться до тех пор пока не взорвётся моя голова. На океаны и острова.'],
            duration:'117'
    },
    3:{
        image:'/img/scrip.jpg',
        text:['Возьми себя в руки, дочь самурая! Возьми себя в руки. Становятся тихими звуки от края до края.',
        'Возьми себя в руки, дочь самурая! Возьми себя в руки. От края до края становятся тихими звуки.',
            'Я буду смеяться до тех пор, пока не взорвётся моя голова. Я буду смеяться пока голова не взорвётся.',
            'Я буду смеяться до тех пор пока не взорвётся моя голова. На океаны и острова.'],
            duration:'282'
    },

}
const btn_play=document.querySelector('.player_cicle')
const swap_left=document.querySelector('.swap_left')
const swap_right=document.querySelector('.swap_right')
const fun__txt=document.querySelector('.fun__txt')
const fun__ecv=document.querySelector('.fun__ecv')
let swap=0;
let context;
let analyser;
const time__now=document.querySelector('.time__now')
const time__all=document.querySelector('.time__all')
const range=document.querySelector('.range')
const h1=document.querySelector('.ecv__h1')
const left=document.querySelector('.left')
const right=document.querySelector('.right')
const random_btn=document.querySelector('.random')
const loop_btn=document.querySelector('.loop')
let next_sound=1;
const allLogo=document.querySelectorAll('.logo')
const player__image=document.querySelector('.player__image')
const cicle__icon=document.querySelector('.cicle__icon')
let random=false;
let old_sound='';


/* Аудио */
const num = 32;
const array = new Uint8Array(num*2);


/* Создание аудио эквалайзера */
function preparation(){
   
    context = new AudioContext();
    analyser = context.createAnalyser();
    const src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination)
    allLogo.forEach(logo=>{
        logo.style.background = '#A33247';
        logo.style.display='block'
    })
    loop();
}

function loop() {
    range.value=audio.currentTime;
    time__now.innerHTML=changeNowTime(Math.floor(audio.currentTime));
    if (!audio.paused){
        window.requestAnimationFrame(loop);
    }
    analyser.getByteFrequencyData(array);
    const allLogo=document.querySelectorAll('.logo')
    for(var i = 0 ; i < num ; i++){
        height = array[i+num]*2.7;
        allLogo[i].style.minHeight = height+'px';
        allLogo[i].style.opacity = 0.008*height;
    }
}

/* Изменение времени под шаблон */

const changeNowTime=(time)=>{
    let minut;
    let second;
    if (Math.floor(time%60)<10) {
        second=`0${Math.floor(time%60)}`
    }else{
        second=Math.floor(time%60);
    }

    if (Math.floor(time/60)<10) {
        minut=`0${Math.floor(time/60)}`
    }else{
        minut=Math.floor(time/60);
    }
    return `${minut}:${second}`
}



/* Повтор */

loop_btn.addEventListener('click',()=>{
    loop_btn.classList.toggle('active')
    random_btn.classList.remove('active')
    random=false;

    if (loop_btn.classList.contains('active')){
        next_sound=0;
    }else{
        next_sound=1;
    }
})


const nextSound=(bool)=>{
   
    if (random) {
        randomSound()
    }else{
        if(bool){
            if (number_sound==Object.keys(sound).length) {
                if (next_sound!==0){
                    number_sound=1
                }
            
            }else{
                number_sound+=next_sound
            }
        }else{
            
            if (number_sound==1) {
                if (next_sound!==0){
                    number_sound=Object.keys(sound).length
                }
            
            }else{
                number_sound-=next_sound
            }
        }
    
    }
   
}

/* Рандом */

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  random_btn.addEventListener('click',()=>{
    loop_btn.classList.remove('active')
    next_sound=1;
    if (random_btn.classList.contains('active')) {
        random=false;
        number_sound=old_sound;
    }else{
        random=true;
        old_sound=number_sound;
        randomSound()
    }
    random_btn.classList.toggle('active')
})

const randomSound=()=>{
    let rand=randomInteger(1,Object.keys(sound). length)
    if (rand==number_sound) {
        randomSound()
    }else{
        number_sound=rand
    }
}

/* Переключение музыки */

left.addEventListener('click',()=>{
    nextSound(false)
    audio.pause()
    audio=new Audio(`/music/${number_sound}.mp3`);
    
    startSound(false)
})

right.addEventListener('click',()=>{
    
    nextSound(true)
    audio.pause()
    audio=new Audio(`/music/${number_sound}.mp3`);
    
    startSound(false)
    
})

/* Старт/стоп музыка */
btn_play.addEventListener('click',()=>{
    startSound(true)
})

const startSound=(bool)=>{
    
  
    if(audio_old!=audio){
        if (random_btn.classList.contains('active')) {
            audio=new Audio(`/music/${number_sound}.mp3`);
            
        }else{
            
        }
        preparation()
        /* Эвент окончания трека */
        audio.addEventListener('ended',()=>{
            if (random_btn.classList.contains('active')) {
                randomSound()
            }else{
                
            }
            nextSound(true)
            audio=new Audio(`/music/${number_sound}.mp3`);
            
            startSound(false)
            
        })
    }
    changeInfo()
   if (bool) {
    if(cicle__icon.classList.contains('play')){
        play()
    }else{
        stop()
    }
   }else{
    if(cicle__icon.classList.contains('play')){
        stop()
    }else{
        play()
    }
   }
}

const play=()=>{
        audio.play()
        h1.remove()
        loop()
        cicle__icon.classList.remove('play')
        cicle__icon.src='/img/player/pause.svg'
}

const stop=()=>{
    audio.pause()
        cicle__icon.classList.add('play')
        cicle__icon.src='/img/player/play.svg'
}

range.addEventListener('input',()=>{
    audio.currentTime=range.value;
})



/* Текст */
swap_right.addEventListener('click',()=>{
   
    if(swap==0){
        swap++;
        document.querySelector('.point__left').classList.remove('active')
        document.querySelector('.point__right').classList.add('active')
        fun__txt.style.display='none'
        fun__ecv.style.display='flex'
    }
})

/* Эквалайзер */

swap_left.addEventListener('click',()=>{
   
    if(swap==1){
        document.querySelector('.point__left').classList.add('active')
        document.querySelector('.point__right').classList.remove('active')
        swap--;
        fun__txt.style.display='block'
        fun__ecv.style.display='none'
    }
})

/* Изменить картинку и текс */

const changeInfo=()=>{
    audio_old=audio;
    player__image.src=sound[number_sound].image
    fun__txt.innerHTML=sound[number_sound].text
    time__all.innerHTML=changeNowTime(sound[number_sound].duration)
    range.max=sound[number_sound].duration
}



