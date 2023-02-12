<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fiesta</title>
        <!-- 링크 주소 상대주소로 변경한거니까 다시 바꾸지 말아주세요 -->
        <link rel="stylesheet" href="/resources/css/common-style.css" />

        <link rel="stylesheet" href="/resources/css/board/newpost-file-style.css" />
        <link rel="stylesheet" href="/resources/css/board/newpost-edit-style.css" />
        <link rel="stylesheet" href="/resources/css/board/newpost-text-style.css" />
        <link rel="stylesheet" href="/resources/css/board/newpost-finish-style.css" />
        <link rel="stylesheet" href="/resources/css/board/newpost-close-style.css" />

        <link rel="stylesheet" href="/resources/css/search/search-complete-style.css" />
        <link rel="stylesheet" href="/resources/css/search/search-complete-style2.css" />

        <link rel="stylesheet" href="/resources/css/swiper-bundle.css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/591746f9e8.js" crossorigin="anonymous"></script>

    </head>
    <body>
        <!-- 헤더 -->
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>
        <main>

            <jsp:include page="/WEB-INF/views/board/newpost-file.jsp" />
            <jsp:include page="/WEB-INF/views/board/newpost-eidt.jsp" />
            <jsp:include page="/WEB-INF/views/board/newpost-text.jsp" />
            <jsp:include page="/WEB-INF/views/board/newpost-close.jsp"/>
            <jsp:include page="/WEB-INF/views/board/newpost-finish.jsp"/>
            <jsp:include page="/WEB-INF/views/board/newpost-update.jsp"/>

        </main>

        <!-- 푸터 -->
        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
        
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script>
          // 로그인한 회원 번호
          const loginMemberNo = "${loginMember.memberNo}";
        </script>
        <script src="/resources/js/newpost.js"></script>
        <script src="/resources/js/boardWriteUpdate.js"></script>
        <script src="/resources/js/common/common.js"></script>
    </body>
</html>