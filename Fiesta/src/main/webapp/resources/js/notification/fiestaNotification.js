/* 문서 로딩 완료 후 수행 */
/* 읽지 않은 알림 수 체크 후 알림 아이콘에 표시 */
if(notificationNo != ""){
document.addEventListener('DOMContentLoaded', () => { 
	axios({
		url: '/notification/status',
		method: 'get'		
	}).then(function(response) {
		//조회해온 읽지 않은 알림 수가 0보다 크면 알림 아이콘에 새알림 표시
		console.log(response);
		if(response.data > 0) {
			document.getElementById('newNotification').classList.remove('hide');
		}

	})
  })
}

console.log("알림 js 연결 완료")

let notificationSock;

// 로그인이 되어 있을 경우에만
// /chattingSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
if(notificationNo != ""){
	notificationSock = new SockJS("/notification");
}

// 새로운 알림을 받았을 때
notificationSock.onmessage = e => {
	const msg = JSON.parse(e.data);
	console.log(msg);

	const onNotification = document.getElementById('onNotification');

	if(document.getElementById('newNotification').classList.contains('hide')) {
		document.getElementById('newNotification').classList.remove('hide');
	}
	
	if(onNotification.classList.contains('hide')) {
		onNotification.classList.add('appear2');
		onNotification.classList.remove('hide');
	
		setTimeout(function(){
			onNotification.classList.add('disappear2');
			onNotification.classList.remove('appear2');
		},2000);
		
		setTimeout(function(){
			onNotification.classList.remove('disappear2');
			onNotification.classList.add('hide');
		},3500);
	}
}



// 알림을 전송하는 함수(유형 번호, 게시글/댓글 번호, 댓글일 시 댓글 내용)
const sendNotification = (typeNo, targetNo, content) => {
	var obj = {
		"typeNo": typeNo,
		"targetNo": targetNo,
		"senderNo": notificationNo,
		"senderNickname": memberNickname,
		"notificationContent" : content
	};
	
	notificationSock.send(JSON.stringify(obj));
}
	
	
//TODO: 알림 버튼 클릭 시 알림창 활성화
// 알림 버튼
const notificationBtn = document.getElementById('notificationBtn');

//알림 목록 컨테이너
const notificationContainer = document.getElementById('notificationContainer');
notificationBtn.addEventListener('click', () => {
	
	if(notificationContainer.classList.contains('hide')) {
		
		//TODO 알림 목록 조회 후 출력
		selectNotificationList();
		
		notificationContainer.classList.remove('hide');
	} else {
		notificationContainer.classList.add('hide');
		notificationContainer.innerHTML = "";
	}
	
})
	
// 새로운 메세지 알림 창 클릭 시
onNotification.addEventListener('click', () => {
	document.documentElement.scrollTop = 0;

	//TODO 알림 목록 조회 후 출력
	selectNotificationList();

	notificationContainer.classList.remove('hide');
})


//TODO 알림 목록 조회하는 함수
const selectNotificationList = () => {
	axios({
		url:'/notification/list',
		method: 'get',
		responseType: 'json'
	}).then(function(response) {
		console.log(response);
		printNotificationList(response.data);
 	});
}



// 알림 목록 조회 후 출력하는 함수
const printNotificationList = (notificationList) => {
	if(notificationList.length == 0) {
		notificationContainer.innerText = "알림이 없습니다."

	} else {
		for(let notification of notificationList) {
			const li = document.createElement('li');
		
			if(notification.notificationStatus == 'N') {
				li.classList.add('unread');
			} else {
				li.classList.add('read');
			}

			const div = document.createElement('div');
			div.innerHTML = notification.notificationContent;

			const span = document.createElement('span');
			span.innerHTML = notification.notificationDate;
			
			li.append(div, span);
			notificationContainer.append(li);
			
			// 목록 클릭 시 읽음 처리
			li.addEventListener('click', () => {
				if(notification.notificationStatus == 'N') {
		
					changeNotificationStatus(notification.notificationNo);
				}

				let href = location.href;
				let path = location.pathname;
				href = href.replaceAll(path, "") + notification.quickLink;
				location.href = href;
			})
		}
	}

}


const changeNotificationStatus = (notificationNo) => {
	console.log(notificationNo);
	$.ajax({
		url: '/notification/status/y',
		type: 'get',
		data: {
			'notificationNo':notificationNo
		},
		success: () => {
			console.log("알림 읽음 처리 완료");
		}
	})
}
