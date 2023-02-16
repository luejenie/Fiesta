// const feedUpdateBtnLogin = document.getElementById("feedUpdateBtnLogin");
// const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");
const updateClose = document.getElementById("updateClose");
const updateClose2 = document.getElementById("updateClose2");

const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");

const boardContent = document.getElementById('updateBoardContent');

//! 수정
feedUpdateBtnLogin.addEventListener("click", (e) => {
  document.body.style.overflow = "hidden";

  modalBackgroundUpdate.style.display = "flex";
  feedMenuLogin.style.display = "none";
  
  console.log("boardNo:" + boardNo);
  
  selectOneBoard();
  
});


const imgFileSwiper = document.getElementById("imgFileSwiper");

var imgOrder; // 이미지 순서

//optimize
/** 수정할 게시글 조회하는 함수 */
const selectOneBoard = () => {

    $.ajax({
      url: "/selectOneBoard",
      data: { boardNo: boardNo},
      dataType: "json",
      success: (map) => {
        console.log(map);
  
        const boardNo = document.getElementById('boardNo');
        boardNo.value = map.board.boardNo;

        // * 수정) 개행문자 해제 위해 innerText -> innerHTML로 수정
        boardContent.innerHTML = map.board.boardContent;


        const imgFileSwiper = document.getElementById("imgFileSwiper");
        imgFileSwiper.classList.add("swiper-wrapper");
        imgFileSwiper.id = "imgFileSwiper";

        
        if(map.count == 0){
          const swiperSlideDiv = document.createElement("div");
          swiperSlideDiv.classList.add("swiper-slide");
  
          const img = document.createElement("img");
          img.classList.add("post-img-viwe");
          img.id = "updateImgList";
          img.setAttribute("src", "/resources/images/default/defaultImg.jpg");
  
          swiperSlideDiv.append(img);
          imgFileSwiper.append(swiperSlideDiv);
        }
    
        // * 수정: 이미지 불러와서 swiper 적용하기
        else if(map.count > 0){  

        for (let i = 0; i < map.board.imageList.length; i++) {
          const swiperSlideDiv = document.createElement("div");
          swiperSlideDiv.classList.add("swiper-slide");
  
          // * 수정: default이미지가 안보이는 문제 해결함!
          const img = document.createElement("img");
          img.classList.add("post-img-viwe");
          img.id = "updateImgList";
          img.setAttribute("src", map.board.imageList[i].imgAddress + map.board.imageList[i].imgChangeName);

          // *휴지통 아이콘
          const iconBackcircle1 = document.createElement("span");
          iconBackcircle1.classList.add("back-circle1");
          iconBackcircle1.id = "trash" + map.board.imageList[i].imgOrder;
          const trashIcon = document.createElement("i")
          trashIcon.classList.add("trash-icon");
          trashIcon.id = "trashIcon";
          trashIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
          //todo: 휴지통 누르면 삭제하기 알림창
          iconBackcircle1.addEventListener('click', () => {
            document.getElementById("deleteModalContainer").style.display = "flex";
            imgOrder = iconBackcircle1.id.substring(5);
            console.log("imgOrder: " + imgOrder);
          })
  
  
          // *사진 추가 아이콘
          // const iconBackcircle2 = document.createElement("span");
          // iconBackcircle2.classList.add("back-circle2");
          // const plusIcon = document.createElement("label")
          // plusIcon.setAttribute("for", "addImages");
          // plusIcon.classList.add("plus-icon");
          // plusIcon.id = "plusIcon";
          // plusIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';

          // const plusInput = document.createElement("input");
          // plusInput.id = "addImages";
          // plusInput.type = "file";
          // plusInput.accept = "image/*";
          // plusInput.style.display = "none";
          // plusInput.name = "addFileImages";

          // plusIcon.append(plusInput);


          // // * 플러스 아이콘 클릭하고, 사진 선택하면,
          // iconBackcircle2.addEventListener('change', (e) => {
          //   for (let j = 0; j < e.target.files.length; i++) {
          //     // 선택한 사진이 있을 경우,
          //     if(e.target.files[0] != undefined){
          //       console.log(e.target.files[j]);
          //       console.log(e.target.files[j].name);
  
          //     }
          //   }
          // })
          
          
          iconBackcircle1.append(trashIcon);
          swiperSlideDiv.append(img, iconBackcircle1);
          // iconBackcircle2.append(plusIcon);
          // swiperSlideDiv.append(img, iconBackcircle1, iconBackcircle2);
          // swiperSlideDiv.append(img);
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

        }  

      },
      error: () => {
        console.log("게시글 조회 error");
      },
    });

    updateClose.addEventListener("click", () => {
      modalBackgroundUpdate.style.display = "none";
      boardContent.innerText = "";
      document.body.style.overflow = "unset";
      imgFileSwiper.innerHTML = "";
      boardContent.innerText = "";
      
    });
    updateClose2.addEventListener("click", () => {
      modalBackgroundUpdate.style.display = "none";
      document.body.style.overflow = "unset";
      imgFileSwiper.innerHTML = "";
      boardContent.innerText = "";
    });
}




// todo: 사진 하나 삭제하기
// 삭제 알림창에서 삭제 클릭하면,
/** 사진 삭제하는 함수 */
console.log("imgOrder: " + imgOrder);

// var yesClicked = 0;

document.getElementById("deleteYes").addEventListener('click', () => {
//   yesClicked = 1;
//   document.getElementById("deleteModalContainer").style.display = "none";
//   console.log(yesClicked);
// });


// // 삭제를 누르고, 완료까지 누르면, 삭제하기
// if(yesClicked == 1 ){
//   document.getElementById("newPostAll").addEventListener('submit', () => {
    $.ajax({
      url: "/deleteBoardImage",
      data: { "boardNo": boardNo, "imgOrder": imgOrder },
      type: "GET",
      dataType: "json",
      success: (result) => { 
        
        if(result > 0){
          console.log("사진 삭제 성공"); 
          document.getElementById("deleteModalContainer").style.display = "none";
          imgFileSwiper.innerHTML = "";
          selectOneBoard();
        }
  
        
    },
      error: () => {console.log("사진 삭제 실패");}
    })
  })
// }



// 삭제 알림창에서 취소 클릭하면,
document.getElementById("deleteNo").addEventListener('click', () => {
  document.getElementById("deleteModalContainer").style.display = "none";
})









// 바깥 클릭하면 모달창 닫힘
window.addEventListener('click', (e) => {
  const modalBackgroundUpdate = document.getElementById("modalBackgroundUpdate");
  const delteModal = document.getElementById("deleteModalContainer");

  // 업데이트 화면
  e.target === modalBackgroundUpdate ? (modalBackgroundUpdate.style.display = "none", imgFileSwiper.innerHTML="", boardContent.innerHTML = "") : false;
  e.target === modalBackground ? (modalBackground.style.display = "none") : false;
  e.target === delteModal ? (delteModal.style.display = "none") : false;
  document.body.style.overflow = "unset";
  // document.getElementById("updateImgList").remove();
  // boardImageOne.innerHTML = "";
  // boardContent.innerText = "";

});