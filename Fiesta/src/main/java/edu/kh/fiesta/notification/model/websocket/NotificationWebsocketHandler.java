package edu.kh.fiesta.notification.model.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import edu.kh.fiesta.member.model.vo.Member;
import edu.kh.fiesta.notification.model.service.NotificationService;
import edu.kh.fiesta.notification.model.vo.Notification;

public class NotificationWebsocketHandler extends TextWebSocketHandler {
	
	private Logger logger = LoggerFactory.getLogger(NotificationWebsocketHandler.class);
	
	@Autowired
	private NotificationService service;
	

	// 동기화 진행하여 한 컬렉션에 스레드가 순서대로 접근할 수 있게 변경
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());


	// 서버 접속 성공 시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// 알림 전송 시
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ObjectMapper notificationMapper = new ObjectMapper();
		
		// 연결된 페이지로부터 메세지를 받음
		Notification notification = notificationMapper.readValue(message.getPayload(), Notification.class);
		
		// 알림을 해석해서 DB에 저장
		int result = service.insertNotification(notification);
		logger.debug(notification.toString());
		
		// DB에 잘 저장되었으면... 알림을 반환
		if(result > 0) {
			
			
			// 알림을 수신할 회원의 번호, 즉 대상 회원의 번호 targetNo
			int targetNo = notification.getMemberNo();
			
//			// notifyTitle을 세팅함(멀티플 키 사용 실패함...)
//			int notifyTypeNo = notification.getNotifyTypeNo();
//			String notifyTitle = service.selectNotifyTitle(notifyTypeNo);

//			notification.setNotifyTitle(notifyTitle);
			
			// 세션을 전부 확인
			for(WebSocketSession s : sessions) {
				
				// 현재 세션 s에 올라가있는 회원 번호를 loginMemberNo에 저장
				int loginMemberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
				
				// 해당 세션의 회원 번호 loginMemberNo가, 알림을 수신할 targetNo와 일치 시 알림을 전달
				if(loginMemberNo == targetNo) {
					s.sendMessage(new TextMessage(new Gson().toJson(notification)));
				}
			}
		}
		
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	
	

}
