// const feedUpdateBtnLogin = document.getElementById("feedUpdateBtnLogin");
// const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");
const updateClose = document.getElementById("updateClose");
const updateClose2 = document.getElementById("updateClose2");

const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");

//! 수정
feedUpdateBtnLogin.addEventListener("click", (e) => {
  document.body.style.overflow = "hidden";

  // 수정할 게시글 조회하기
  $.ajax({
    url: "/selectOneBoard",
    data: { boardNo: boardNo},
    dataType: "json",
    success: (board) => {
      console.log(board);
      const boardContent = document.getElementById('updateBoardContent');
      // const boardImageOne = document.getElementById('boardImageOne');
      const boardNo = document.getElementById('boardNo');
      boardNo.value = board.boardNo;
      
      //todo: 이미지 불러와서 swiper 적용하기

      // 이벤트 발생한 요소에 선택된 파일이 있을 경우
      for (let i = 0; i < board.imageList.length; i++) {
  
        //fixme: 파일 추가, 삭제 기능 추가하기
        //fixme: 이미지 1:1로
        //fixme: 이미지위치 조정te
  
  
        const swiperSildeDiv = document.createElement("div");
        const fileImg = document.createElement("img");

        swiperSildeDiv.classList.add("swiper-slide");
        fileImg.classList.add("post-img-viwe");
        fileImg.id = "updateImgList";
        fileImg.setAttribute("src", board.imageList[i].imgAddress+board.imageList[i].imgChangeName);

        swiperSildeDiv.append(fileImg);
        textFileSwiper.append(swiperSildeDiv);

        var swiper = new Swiper(".swiper", {
          spaceBetween: 0.5, // 슬라이드 사이 여백
          slidesPerView: "auto", // 한 슬라이드에 보여줄 갯수
          centeredSlides: true, //센터모드
          // autoplay: {     //자동슬라이드 (false-비활성화)
          //   delay: 2500, // 시간 설정
          //   disableOnInteraction: false, // false-스와이프 후 자동 재생
          // },
          loop: false, // 슬라이드 반복 여부

          loopAdditionalSlides: 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
          pagination: {
            // 호출(pager) 여부
            el: ".swiper-pagination", //버튼을 담을 태그 설정
            clickable: true, // 버튼 클릭 여부
          },
          navigation: {
            // 버튼
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        
      }


      // const img = document.createElement('img');
      // // for(let i = 0; i < board.boardImageOne.length; i++){
      //   if(board.imageList[0].imgAddress == null){
      //     img.setAttribute('src',"/resources/images/default/defaultImg.png");
      //   }else{
      //     img.setAttribute('src', board.imageList[0].imgAddress+board.imageList[0].imgChangeName);
      //   }
      // // }
     
      // img.id="updateImgList";

      // console.log(img);
      // boardImageOne.append(img);

      // fix: 개행문자 해제 위해 innerText -> innerHTML로 수정
      boardContent.innerHTML = board.boardContent;

      modalBackgroundUpdate.style.display = "flex";
      feedMenuLogin.style.display = "none";
    },
    error: () => {
      console.log("게시글 조회 error");
    },
  });



  updateClose.addEventListener("click", () => {
    modalBackgroundUpdate.style.display = "none";
    // boardContent.innerText = "";
    document.body.style.overflow = "unset";
    boardImageOne.innerHTML = "";
    boardContent.innerText = "";

  });
  updateClose2.addEventListener("click", () => {
    modalBackgroundUpdate.style.display = "none";
    // boardImageOne.innerHTML = "";
    // boardContent.innerText = "";
    // console.log("눌렸나욤?2");
    document.body.style.overflow = "unset";
    // document.getElementById("updateImgList").remove();
    boardImageOne.innerHTML = "";
    boardContent.innerText = "";
  });
});





window.addEventListener('click', (e) => {
  const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");

  // 업데이트 화면
  e.target === modalBackgroundUpdate ? (modalBackgroundUpdate.style.display = "none", boardImageOne.innerHTML = "", boardContent.innerText = "") : false
  e.target === modalBackground ? (modalBackground.style.display = "none") : false;
  document.body.style.overflow = "unset";
  // document.getElementById("updateImgList").remove();
  // boardImageOne.innerHTML = "";
  // boardContent.innerText = "";

});