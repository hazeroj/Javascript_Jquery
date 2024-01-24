$(document).ready(function () {
    // 1. 변수선언
    let gnb = $('header .gnb>ul>li>a')

    // 2. gnb메뉴 클릭시 해당 서브메뉴 보이게하기
    gnb.click(function () {
        $('.sub').slideUp(); //보이는 서브 숨기고
        // 선택한 서브만 보이게 한다.
        // $(this).next().show();
        $(this).next().slideToggle();
    })
    // sub숨기는 법
    // $(this).next().toggle().parent().sibilings().find('.sub').hide();



    //gnb바깥을 눌렀을 때 서브메뉴 숨기기
    $('main').click(function () {
        $('.sub').slideUp();
    })

    // 모바일 토글버튼 모양변경
    $('#toggle').click(function () {
        $('#toggle span:nth-child(2)').toggle();
        $('#toggle span:first-child').toggleClass('rotate1')
        $('#toggle span:last-child').toggleClass('rotate2')
        $(this).toggleClass('dark')
    })

    $('#toggle').click(function () {
        $('.gnb').slideToggle()
        $('.sub').hide()
    })




    // 1. 변수선언
    const l_btn = $('.visual .s_btn li:first-child'); //좌측버튼
    const r_btn = $('.visual .s_btn li:last-child'); //우측버튼
    const c_btn = $('.visual .ctrl_btn li'); //콘트롤버튼

    let v_slide_img = $('.visual > div') //슬라이드 이미지
    let i = 0; //인덱스값은 0부터 시작

    // 2. 움직이는 함수 = 서서히 사라지고 나타나는 효과
    function fadeInOut() {
        // console.log('시간함수호출')
        v_slide_img.fadeOut() //보이는 이미지 숨기고
        //0번째 슬라이드 이미지, 인덱스번호

        $('.visual .ctrl_btn li').removeClass('on'); // 기존 콘트롤 버튼 서식 모두제거
        if (i == 2) { //만약에 마지막 이미지라면
            i = 0; //처음 이미지가 보이게하고
        } else { //그렇지 않으면
            i++; //다음 이미지가 보이도록 한다.
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on'); //선택한 콘트롤 버튼 
        // stop을 넣어 애니메이션을 한번만 실행해줌, 좌우버튼을 누르면 멈춤
        v_slide_img.eq(i).stop().fadeIn(); //해당이미지가 보이게 한다.
    }

    function fadeInOut2() {
        v_slide_img.fadeOut();
        $('.visual .ctrl_btn li').removeClass('on'); // 기존 콘트롤 버튼 서식 모두제거
        if (i == 0) {
            i = 2;
        } else {
            i--;
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on'); //선택한 콘트롤 버튼 

        v_slide_img.eq(i).stop().fadeIn()
    }
    // 3. 매 5초마다 함수를 반복호출하여 슬라이드가 변하게한다.
    let Timer = setInterval(fadeInOut, 5000);
    // setInterval 먼저실행 , setTimeOut은 나중실행

    // 좌우버튼클릭시 해당하는 방향으로 슬라이드 이미지가 나오게 하기

    l_btn.click(function () {
        fadeInOut2();
    })

    r_btn.click(function () {
        fadeInOut();
    })

    // 좌우버튼 마우스 오버시 시간을 제거하고 ,hover는 함수를 두개 넣을 수 잇다.
    $('.s_btn li').hover(function () {
        clearInterval(Timer);
    }, function () { //마우스 아웃시 시간을 생성한다.
        Timer = setInterval(fadeInOut, 5000);
    })

    //콘트롤 버튼
    // 1. 현재 이미지 번호를 체크
    // 2. 이미지 전체개수

    /*구현순서
    1. 콘트롤 버튼 변수 선언
    2. 콘트롤 버튼(li)클릭시 인덱스값 0,1,2값을 출력
    3. 인덱스 값을 fadeInOut함수의 매개변수값으로 넘김
    4. 사용자가 클릭한 콘트롤 버튼(li)에 act서식을 적용하여 어둡게 함*/

    c_btn.click(function () {

        // 인덱스번호확인하기
        let idx = $(this).index();
        console.log(idx); //0,1,2

        $('.visual .ctrl_btn li').removeClass('on'); // 기존 콘트롤 버튼 서식 모두제거

        v_slide_img.fadeOut()
        $('.visual .ctrl_btn li').eq(idx).addClass('on'); //선택한 콘트롤 버튼 
        v_slide_img.eq(idx).stop().fadeIn();

        i = idx // 원래 i값에 idx값을 일치시켜서 다음 순서가 제대로 나오게 해준다.

        clearInterval(Timer);

    });
    // 콘트롤 버튼에 마우스 오버시 시간을 제거하여 슬라이드 멈추게한다.
    c_btn.mouseenter(function () {
        Timer = clearInterval(Timer)
    })
    // 콘트롤 버튼에 마우스 아웃시 다시 자동으로 움직이도록 시간객체를 생성함
    c_btn.mouseleave(function () {
        Timer = setInterval(fadeInOut, 5000);
    })

    // 제이쿼리를 이용한 반응형웹만들기

    // 윈도우 창의 너비값 = $(window).width(//윈도우창의너비); or $(window).height();
    //$(window).innerWidth(); 안쪽 패딩값을 포함한 너비

    let w_width;
    w_width = $(window).innerWidth();
    console.log(w_width)

    // 브라우저의 크기가 변하면 함수내용을 실행한다.
    /*$(window).resize(function () {
        w_width = $(window).innerWidth();
        console.log(w_width)

        // pc버전 해상도일 경우 배경색 노랑
        if (w_width >= 1025) {
            $('body').css('background', '#ff0');
            $('header h1 img').attr('src', './images/logo2.png');

        } else if (w_width >= 768/*w_width>767&&w_width<=1024) {
            $('body').css('background', '#0f0')

            // attr();속성메서드
            $('header h1 img').attr('src', './images/logo.png');
        } else {
            $('body').css('background', '#ccc')
            $('header h1 img').attr('src', './images/logo.png');

        }

    }).resize();*/


    // 탭메뉴 만들기 
    // 1. 변수설정
    const ev_btn = $('.tab_con_wrap>li>a')
    $('.tab_con_wrap>li:first-child>div').show();

    // 2. 버튼클릭시 내용보이기 구현
    ev_btn.click(function () {

        $(this).next().show().parent().siblings().find('div').hide();

        $(this).addClass('act').parent().siblings().find('a').removeClass('act');

        const n = $(this).parent().index();

        console.log(n);


        // li태그의 인덱스 번호를 구하여 인덱스가 2라면 부모박스 높이를 키우고 아니면 원래높이로 설정함
        if (n == 2) {
            $('.tab_con article').height(1200);
        } else {
            $('.tab_con article').height(850);
        }
    })

    // 하영이 구한 세번째 메뉴 클릭시 높이다르게하기
    /* $('.tab_con_wrap>li:last-child>a').click(function(){
        $('.tab_con').css('height','900px')
    })
    ev_btn.not('.tab_con_wrap>li:last-child>a').click(function(){
        $('.tab_con').css('height','500px')
     }) */



    ev_btn.click(function () {

    })


    // 이벤트서식

    const eslide = $('.es_wrap')
    const es_lbtn = $('.event>.fa-angle-left')
    const es_rbtn = $('.event>.fa-angle-right')

    // 1번 슬라이드의 앞에 3번 슬라이드를 배치한다.
    $('.es_wrap>div:last-child').insertBefore('.es_wrap>div:first-child')

    // 왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.

    eslide.css('margin-left', '-100%')

    // moveleft함수
    function moveLeft() {
        eslide.animate({ 'margin-left': '-200%' }, 500, function () {
            $('.es_wrap>div:first-child').insertAfter('.es_wrap>div:last-child')
            eslide.css('margin-left', '-100%')
        })
    }

    let Timer2 = setInterval(moveRight, 4000);

    // moveright함수
    function moveRight() {
        eslide.animate({ 'margin-left': '0px' }, 500, function () {
            $('.es_wrap>div:last-child').insertBefore('.es_wrap>div:first-child')
            eslide.css('margin-left', '-100%')
        })
    }

    // 좌측버튼클릭시
    es_lbtn.click(function () {
        clearInterval(Timer2);
        moveLeft();
    })

    // 우측버튼클릭시
    es_rbtn.click(function () {
        clearInterval(Timer2);
        moveRight()
    })

    // 마우스 제거시 다시 움직임

    $('.es_slide i.fas').mouseleave(function () {
        Timer = setInterval(moveLeft, 4000)
    })


    // 스토리 갤러리

    const miero = $('.gallery .miero li')

    miero.find('a').click(function () {
        let g_image = $(this).find('img').attr('src')
        console.log(g_image)
        let i = $(this).parent().index() + 1;


        let modal =
            `<div class=modal>
            <div class=center>
                <h3>이미지갤러리</h3>
                <img src=${g_image} alt="image">
                <i class="fas fa-times"></i>
                <i class="fas fa-angle-left"></i>
                <i class="fas fa-angle-right"></i>
                <span> ${i} / ${miero.index() + 1}</span>
            </div>
        </div>`

        $('body').append(modal)

        // 닫기 버튼
        let g_close = $('.modal .center .fa-times')
        g_close.click(function () {
            $('.modal').hide();
        })

        // 좌우측 버튼 클릭시 일어날 일
        let g_r_btn = $('.modal .center .fa-angle-right')
        let g_l_btn = $('.modal .center .fa-angle-left')

        g_r_btn.click(function () {
            if (i == 8) {
                i = 1
            } else {
                i++;
            }

            // console.log(i)
            dataChange(i)
        })


        g_l_btn.click(function () {
            if (i == 1) {
                i = 8
            } else {
                i--;
            }
            // console.log(i)
            dataChange(i)
        })

        function dataChange(i) {

            // 하단 숫자를 바꾼다.
            $('.modal span').text(`${i}` + ' / ' + `${miero.index() + 1}`)

            // 이미지를 변경한다.
            let c_image = $('.miero li').eq(i - 1).find('a>img').attr('src')
            // console.log(c_image)
            $('.modal img').attr('src', c_image)
        }


    })

    // 탑버튼
    // 윈도우세로 스크롤값을 구하여, top버튼 보이게하고 그렇지 않으면 숨기게한다
    $(window).scroll(function () {
        let s_pos = $(this).scrollTop();
        console.log(s_pos);

        if (s_pos >= 800) {
            $('footer .t_btn').fadeIn();
        } else { $('footer .t_btn').fadeOut(); }
    })

    // 탑버튼 최상단으로 올리기
    $(' footer .t_btn').click(function () {
        $('html, body').animate({ 'scrollTop': '0px' }, 500)

        return false;
    })


});