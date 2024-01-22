//외부스크립트 carousel.js

// 1.변수선언

const slide = document.querySelector('.slide');
// 상품목록의 부모요소
const slide_img = document.querySelectorAll('.slide li');
// 상품목록
const l_btn=document.getElementById('l_btn'); //이전
const r_btn=document.getElementById('r_btn'); //다음

// stop버튼
const stop_btn = document.querySelector('.fa-stop')
// play버튼
const play_btn = document.querySelector('.fa-play')

const img_n = slide_img.length; //li개수를 변수에 담는다.
console.log(img_n); //5

const img_w=100;//상품사진너비
const m=0; //여백너비
const s_count =1; //한페이지에 보여질 상품개수

let count = 0; //이전 다음 클릭시 사용할 변수값 설정, 초기값 0


//왼쪽으로 움직이는 슬라이드 함수 작성하기
function mslide(n){
    slide.style.left=(img_w+m)*-n+'%'
    count=n
    console.log(count) 
    console.log(slide.style.left);
}
//이전버튼 클릭시 왼쪽으로 슬라이드 이동
l_btn.addEventListener('click',function(){
    if(count>0){ //만약에 카운트 값이 0보다 크면
        mslide(count-1); //카운트 값에 1을 빼서 mslide에 넘김
    }else{
        mslide(img_n-s_count); 
    }
})

//이전버튼 클릭시 왼쪽으로 슬라이드 이동
r_btn.addEventListener('click',function(){
    if(count<img_n-s_count){  //0보다 li개수가 많다면
        mslide(count+1);  //0+1해서 넘김
    }else{ //그렇지않다면
        mslide(0); } // 0을 대입하여 처음으로 돌아감
})

//3초마다 자동으로 슬라이등 움직이게 하기
//시간객체setInterval(함수명,반복시간) / 내가 지정한 시간동안 계속 반복해서 호출할 수 있다.
let Timer = setInterval(function(){
    console.log('반복호출실행')
    if(count == 5){
        count=0
    }else{count++;
    }
    mslide(count)//mslide에 count값을 넘겨서 자동으로 움직이게 한다.
    // console.log(count)
},3000)

// stop_btn 클릭시 시간을 제거하여 멈추게함
stop_btn.addEventListener('click',function(){
    clearInterval(Timer) //시간객체를 없애다.
})

//play_btn클릭시 시간을 다시 생성하여 자동으로 움직이게 함
play_btn.addEventListener('click',function(e){ //e=event객체
    //기존 자동재생이 되고있다면 제거하고
    clearInterval(Timer);

    //위에서 변수선언을 한 상태(전역변수) 다시 변수설정하지 않는다.
    //3초마다 움직이게 함
    Timer = setInterval(function(){
        console.log('반복호출실행')
        if(count == 5){
            count=0
        }else{count++;
        }
        mslide(count)//mslide에 count값을 넘겨서 자동으로 움직이게 한다.
        // console.log(count)
    },3000);

    e.preventDefault();//이벤트 중복현상을 제거
})