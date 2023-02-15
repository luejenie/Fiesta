// const feedUpdateBtnLogin = document.getElementById("feedUpdateBtnLogin");
// const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");
const updateClose = document.getElementById("updateClose");
const updateClose2 = document.getElementById("updateClose2");

const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");

const boardContent = document.getElementById('updateBoardContent');

//! 수정
feedUpdateBtnLogin.addEventListener("click", (e) => {
  document.body.style.overflow = "hidden";

  // 수정할 게시글 조회하기
  $.ajax({
    url: "/selectOneBoard",
    data: { boardNo: boardNo},
    dataType: "json",
    success: (map) => {
      console.log(map);

      // const boardImageOne = document.getElementById('boardImageOne');
      const boardNo = document.getElementById('boardNo');
      boardNo.value = map.board.boardNo;
      
      // * 수정: 이미지 불러와서 swiper 적용하기

      // 이벤트 발생한 요소에 선택된 파일이 있을 경우
      for (let i = 0; i < map.board.imageList.length; i++) {
  
        
        const imgFileSwiper = document.getElementById("imgFileSwiper");
        const swiperSlideDiv = document.createElement("div");
        const img = document.createElement("img");
        
        swiperSlideDiv.classList.add("swiper-slide");
        img.classList.add("post-img-viwe");
        img.id = "updateImgList";
        
        if(map.count == 0){
        //fixme: default이미지가 안보여!!!
        img.setAttribute("src", "/resources/images/default/defaultImg.png");
        } else {
          img.setAttribute("src", map.board.imageList[i].imgAddress + map.board.imageList[i].imgChangeName);
        }

        
        //fixme: 파일 추가, 삭제 기능 추가하기
        // todo: 휴지통 아이콘
        const trashIcon = document.createElement("i")
        trashIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trashIcon.classList.add("trash-icon");

        // todo: 사진추가
        const plusIcon = document.createElement("i")
        plusIcon.innerHTML = '<i class="fa-solid fa-square-plus"></i>';
        plusIcon.classList.add("plus-icon");

        swiperSlideDiv.append(img, trashIcon, plusIcon);
        imgFileSwiper.append(swiperSlideDiv);
        
   

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

      // * 수정) 개행문자 해제 위해 innerText -> innerHTML로 수정
      boardContent.innerHTML = map.board.boardContent;

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
    imgFileSwiper.innerHTML = "";
    boardContent.innerText = "";

  });
  updateClose2.addEventListener("click", () => {
    modalBackgroundUpdate.style.display = "none";
    // boardImageOne.innerHTML = "";
    // boardContent.innerText = "";
    // console.log("눌렸나욤?2");
    document.body.style.overflow = "unset";
    // document.getElementById("updateImgList").remove();
    imgFileSwiper.innerHTML = "";
    boardContent.innerText = "";
  });
});


//todo: 사진 추가하기
const addImages = () => {






}
















// 바깥 클릭하면 모달창 닫힘
window.addEventListener('click', (e) => {
  const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");

  // 업데이트 화면
  e.target === modalBackgroundUpdate ? (modalBackgroundUpdate.style.display = "none", imgFileSwiper.innerHTML="", boardContent.innerHTML = "") : false
  e.target === modalBackground ? (modalBackground.style.display = "none") : false;
  document.body.style.overflow = "unset";
  // document.getElementById("updateImgList").remove();
  // boardImageOne.innerHTML = "";
  // boardContent.innerText = "";

});