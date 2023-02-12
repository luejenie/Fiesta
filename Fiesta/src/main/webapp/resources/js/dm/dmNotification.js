//todo: 새 dm이 왔을 때 헤더 비행기 아이콘에 표시
// footer에만 적용
// dm.jsp에 footer가 들어가있기 때문에
// dm.js에서 newMessageNotice() 함수 사용 가능! -> 헤더, 디엠페이지 알림 모두 해결
// 고민했던 문제 -> 기존의 chattingWebsocket 사용함 

// 로그인이 되어 있을 경우에만
// /chattingSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
// footer에 loginMember.memberNo가 notificationNo로 되어 있어서 해당 변수 사용
if(notificationNo != ""){
	chattingWebsocket = new SockJS("/chattingSock");
    document.addEventListener('DOMContentLoaded', () => { 
        newMessageNotice();
    })
}


// WebSocket 객체 chattingSock이 서버로부터 메세지를 통지 받으면 자동으로 실행될 콜백 함수
chattingWebsocket.onmessage = function(e){
  const msg = JSON.parse(e.data);
  console.log("새로운 메시지 알림 : " + msg);

	// 새로운 메시지가 왔을 때,
    // 헤더 비행기 아이콘에 빨간 점 보이기
	if(document.getElementById('newMessage').classList.contains('hide')) {
		document.getElementById('newMessage').classList.remove('hide');
	}

}

/** 새로운 메시지 알림 */
const newMessageNotice = () => {
    axios({
        url: '/dm/newMessageNotice',
        method: 'get'		
    }).then(function(response) {
        //조회해온 읽지 않은 알림 수가 0보다 크면 알림 아이콘에 새알림 표시
        if(response.data > 0) {
            document.getElementById('newMessage').classList.remove('hide');
        } else {
            document.getElementById('newMessage').classList.add('hide');
          }

    })
}