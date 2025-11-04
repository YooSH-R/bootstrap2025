$(document).ready(function(){

  //1. 변수선언
  //메인메뉴
  let mnu = $('nav.gnb > ul > li > a');

  //2. 메인메뉴 클릭시 서브메뉴 보이게/보일때 클릭하면 숨기게
  mnu.click(function(){
    //$('.sub').hide(); //보이는 서브메뉴는 모두 숨기고
    //$(this).next().toggle(); //선택한 메인메뉴의 다음 요소 sub가 보이거나 숨기게한다.

    //선택한 a요소의 다음요소인 .sub를 나오거나 숨기게하고 부모요소의 형제요소인 li태그의 자손 .sub를 숨긴다.
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });

  //main을 클릭하면 .sub를 숨긴다
  $('main').click(function(){
    $('.sub').hide();
  });

});