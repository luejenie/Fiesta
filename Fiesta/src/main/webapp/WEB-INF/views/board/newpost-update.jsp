<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- <form action="/" method="POST" enctype="multipart/from-data" onsubmit="return writeValidate()"> --%>
<div class="modal_background" id="modalBackgroundUpdate">
    <!-- 닫기버튼 -->
    <div class="new-post-close" id="updateClose2">&times;</div>
    <!-- post 배경 -->

    <section class="modal_post_section_text" >
      <!-- post top -->


      <form action="/boardUpdate" method="POST" enctype="multipart/form-data" id="postForm" name="postForm" onsubmit="return writeValidate()">

        <input type="hidden" name="boardNo" id="boardNo">

        <div class="new-post-top-text">
          <div id="updateClose">취소</div>
          <p id="postName">수정하기</p>
          <button name="newpostText" id="newPostAll">완료</button>
        </div>
        <!-- post-bottom -->
        <div class="new-post-bottom-text">
          <div class="bottom-left-box swiper" id="leftBox">
            <div class="swiper-wrapper" id="imgFileSwiper">
              
            </div>
            <div class="swiper-pagination">

            </div>
            <div class="siltde-btn-area slide-controller">
              <div class="sild-file-btn swiper-button-prev">
                <!-- <div class="material-icons">arrow_back</div> -->
              </div>
              <div class="sild-file-btn swiper-button-next">
                <!-- <div class="material-icons">arrow_forward</div> -->
              </div>
            </div>
          </div>

          <div class="bottom-right-box">
            <div class="new-post-bottom-information">
              <div class="new-post-bottom-member">
                <img id="file" src="${loginMember.memberProfileImg}" alt="${loginMember.memberProfileImg}">
                <div class="member-nikname">${loginMember.memberNickname}</div>
              </div>

              <div class="new-post-bottom-inputtext">
                <textarea name="boardContent" rows="15" placeholder="문구 입력..." id="updateBoardContent" spellcheck="false"></textarea>
              </div>
<%-- 
              <div class="new-post-bottom-textsize">
                <span>0</span>
                /
                <span>3000</span>
              </div> --%>

          
      
            </div>
          </div>
        </div>
      
      </form>
      
    </section>
  </div>
</form>

<!-- 삭제 확인 모달 -->
<div class="delete-modal-container" id="deleteModalContainer">
  <div class="delete-check-modal" id="deleteCheckModal">
    <div class="delete-ask">이 사진을 삭제하시겠습니까?</div>
    <div class="delete-ask2"> 삭제를 클릭하면, 게시글 수정을 취소하여도 사진은 삭제됩니다.</div>
    <div class="yes-or-no">
      <span class="delete-option" id="deleteYes">삭제</span>
      <span class="delete-option" id="deleteNo">취소</span>
    </div>
  </div>
</div>
     