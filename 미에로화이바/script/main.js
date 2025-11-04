/* main.js */

$(document).ready(function(){
  // 내비게이션
  $('.gnb li a').click(function(e){
    e.stopPropagation()
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });
  $(document).click(function(){
    $('.sub').hide();
  });


  let n=1;

  // 메인슬라이드
  function fadeInOut(){
    // 이미지 숨기기
    $('.slide img').eq(n-1).fadeOut();
    // 컨트롤버튼 배경색 제거
    $('.ctrl_btn > span').removeClass('ctrl_act')

    if(n==3){n=1}else{n++};

    $('.slide img').eq(n-1).fadeIn();

    $('.ctrl_btn > span').eq(n-1).addClass('ctrl_act')

  }

  let Timer = setInterval(fadeInOut, 4000);

  // 컨트롤 버튼(좌, 우) 클릭시
  $('.c_btn > li:first-child').click(function(){
    clearInterval(Timer);
    $('.slide img').eq(n-1).fadeOut();
    $('.ctrl_btn > span').removeClass('ctrl_act')
    if(n==1){n=3}else{n--};
    $('.slide img').eq(n-1).fadeIn();
    $('.ctrl_btn > span').eq(n-1).addClass('ctrl_act')
    Timer = setInterval(fadeInOut, 4000);
  });

  $('.c_btn > li:last-child').click(function(){
    clearInterval(Timer);
    fadeInOut();
    Timer = setInterval(fadeInOut, 4000);
  });

  // 컨트롤 버튼(페이지네이션) 클릭시
  $('.ctrl_btn > span').click(function(){
    clearInterval(Timer);

    // 슬라이드 이동
    n=$(this).index();
    fadeInOut();
    Timer = setInterval(fadeInOut, 4000);
  });



  // 탭메뉴 콘텐츠
  let con1_nav = $('.con1 > nav > ul > li > a');
  con1_nav.click(function(e){
    e.preventDefault();

    // 내비게이션 클릭시 배경색 바뀜
    $(con1_nav).removeClass('active');
    $(this).addClass('active');
    
    // 내비게이션 클릭시 콘텐츠 바뀜
    if($(this).parent().index()==0){
      $('.con1_content > li').hide();
      $('.con1_content > li:first-child').show();
    }else if($(this).parent().index()==1){
      $('.con1_content > li').hide();
      $('.con1_content > li:nth-child(2)').show();
    }else{
      $('.con1_content > li').hide();
      $('.con1_content > li:nth-child(3)').show();
    }
  });

  // 갤러리 목록아래 '더보기'버튼 클릭시
  // ajax비동기 방식으로 json데이터 #list 추가하기
  $('.more_btn').click(function(e){
    e.preventDefault();

    // alert('닫기버튼 클릭');

    // 비동기 방식으로 새로고침 없이 json데이터 불러오기
    $.ajax({
      url:'data/data.json', // 불러올 파일이름 지정
      type:'post', // 데이터 전송 방식
      dataType:'json', // 데이터 파일 형식
      success:function(result){ // 위 과정이 성공이면 함수 내용을 실행
        var t='<ul>'; // 시작태그
        $.each(result.product, function(i, e){
          // li태그가 json 데이터 개수만큼 추가되어야 한다.
          t+="<li><img src='./images/"+ e.path +"' alt='"+ e.tit +"'></li>";
        })

        t+="</ul>"; // 종료태그
        $('#list').html(t);
      }
    });

    // 더보기 버튼은 숨긴다.
    $(this).hide();
  });
});

