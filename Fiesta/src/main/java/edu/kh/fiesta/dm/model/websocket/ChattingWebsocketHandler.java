package edu.kh.fiesta.dm.model.websocket;


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

import edu.kh.fiesta.dm.model.service.DmService;
import edu.kh.fiesta.dm.model.vo.Message;
import edu.kh.fiesta.member.model.vo.Member;

public class ChattingWebsocketHandler extends TextWebSocketHandler{
	
	private Logger logger = LoggerFactory.getLogger(ChattingWebsocketHandler.class);
	
	@Autowired
	private DmService service;
	
	// 동기화 진행하여 한 컬렉션에 스레드가 순서대로 접근할 수 있게 변경
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());

	
	// afterConnectionEstablished : 클라이언트와 연결이 완료되고 통신할 준비가 되면 수행
	// JS의 new SockJS("/chattingSock")
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {

		// WebSocketSession : 클라이언트와 서버 간의 전이중통신을 담당 + 웹소켓에 접속한 회원의 HttpSession을 훔쳐서 가지고 있음.
		
		// 현재 채팅방에 접속한 회원의 세션을 모아둠
		sessions.add(session);
	}

	
	// handleTextMessage : 클라이언트로부터 텍스트 메시지를 받으면 수행되는 메서드
	// JS의 chattingSock.send(JSON 데이터)
	// --> handleTextMessage가 수행
	// --> message.getPayLoad() 수행하면 값 전달 받음 == JSON 데이터
	@Override 
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

	logger.info("전달 받은 내용 : " + message.getPayload());
	
	// ** Jaskson-databind에서 제공하는 ObjectMapper 객체 사용
	// ObjectMapper : JSON을 해석해서 지정된 VO로 변환하는 객체(필드에 값 세팅)
	ObjectMapper objectMapper = new ObjectMapper();
	
	Message msg = objectMapper.readValue(message.getPayload(), Message.class); 
	
	// 메세지 DB에 insert
	int result = service.insertMessage(msg);
	
	if(result > 0) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy,MM.dd hh:mm");
		msg.setSendDate(sdf.format(new Date()));
		// msg 객체(채팅방번호, 대상번호, 내용, 보낸사람 번호, 보낸 시간)
		// -> JSON으로 변환
		// -> 로그인한 회원 중 
		//    대상번호, 보낸사람번호가 일치하는 2명에게 
		//    웹소켓으로 메세지 전달
		
		System.out.println(msg);
		
								// sessions : 접속중인 모든 회원의 세션 정보가 담겨 있음
		for(WebSocketSession s : sessions) {
            // WebSocketSession은 HttpSession의 속성을 가로채서 똑같이 가지고 있기 때문에
            // 회원 정보를 나타내는 loginMember도 가지고 있음.
			
			// 로그인된 회원 정보 중 회원 번호 얻어오기
			int loginMemberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
			
			// 로그인한 회원과 targetNo/보낸사람이 일치하는 회원에게 메세지 전달
			if(loginMemberNo == msg.getTargetNo() || loginMemberNo == msg.getSenderNo()) {
				s.sendMessage(new TextMessage(new Gson().toJson(message)));
			}
		}
		
	}
	
	
	}
	
	

	// afterConnectionClosed : 클라이언트와 연결이 끊기면 수행되는 메서드
	// --> 채팅방 화면(SockJS 객체가 있는 화면)을 벗어나면 연결 종료
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		// 채팅방에서 나간 회원의 세션을 Set에서 제거
		sessions.remove(session);
	}
	
	

}
