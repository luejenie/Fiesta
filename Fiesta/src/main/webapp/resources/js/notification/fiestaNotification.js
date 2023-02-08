
// 로그인이 되어 있을 경우에만
// /chattingSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
if(notificationNo != ""){
	notificationSock = new SockJS("/notification");
}

notificationSock.onmessage = e => {
	const msg = JSON.parse(e.data);

	console.log(msg);
}

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

const sendChatNotification = (typeNo, targetNo, memberNo) => {
	var obj = {
		"typeNo": typeNo,
		"targetNo": targetNo,
		"memberNo": memberNo
	};

	notificationSock.send(JSON.stringify(obj));
}