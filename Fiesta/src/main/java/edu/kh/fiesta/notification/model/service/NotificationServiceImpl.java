package edu.kh.fiesta.notification.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.Comment;
import edu.kh.fiesta.notification.dao.NotificationDAO;
import edu.kh.fiesta.notification.model.vo.Notification;

@Service
public class NotificationServiceImpl implements NotificationService{
	
	@Autowired
	private NotificationDAO dao;
	
	@Override
	public int insertNotification(Notification notification) {
		
		int typeNo = notification.getTypeNo();
		int targetNo = notification.getTargetNo();
		Board board;
		Comment comment;
		
		switch (typeNo) {
		
		// 댓글 작성 시 게시글 작성자에게 알림
		case 1: 
			board = dao.selectBoard(targetNo);
			notification.setMemberNo(board.getMemberNo());
			notification.setNotificationContent(
					notification.getSenderNickname() + "님이 회원님의 게시글에 댓글을 남겼습니다.");
			notification.setQuickLink("/feedDetail/" + targetNo);
			
			break;
			
		// 답글 작성 시 부모 댓글 작성자에게 알림
		case 2: 
			comment = dao.selectComment(targetNo);
			notification.setMemberNo(comment.getCommentMemberNo());
			notification.setNotificationContent(notification.getSenderNickname() 
					+ "님이 댓글을 달았습니다. " + notification.getNotificationContent());
			notification.setQuickLink("/feedDetail/" + comment.getBoardNo());
			break;
			
			
		// 게시글 좋아요 시 게시글 작성자에게 알림
		case 3:
			board = dao.selectBoard(targetNo);
			notification.setMemberNo(board.getMemberNo());
			notification.setNotificationContent(
					notification.getSenderNickname() + "님이 회원님의 게시글을 좋아합니다.");
			notification.setQuickLink("/feedDetail/" + targetNo);
			break;
			
		// 댓글 좋아요 시 댓글 작성자에게 알림
		case 4:
			comment = dao.selectComment(targetNo);
			notification.setMemberNo(comment.getCommentMemberNo());
			notification.setNotificationContent(notification.getSenderNickname() 
					+ "님이 회원님의 댓글을 좋아합니다 ");
			notification.setQuickLink("/feedDetail/" 
					+ comment.getBoardNo());
			
			break;	
		
		// 팔로우 시 팔로잉 대상에게 알림
		case 5:
			int memberNo = dao.selectMemberNo(notification.getNotificationContent());;
			notification.setMemberNo(memberNo);
			notification.setNotificationContent(notification.getSenderNickname() 
					+ "님이 회원님을 팔로우 했습니다.");
			notification.setQuickLink("/feed/" + notification.getSenderNickname());
			
			break;	
		}
		
		int result = 0;
		
		// 알림을 보낸 사람과 받는 사람이 일치하지 않을 때만 DB에 저장
		if(notification.getSenderNo() != notification.getMemberNo()) {
			result = dao.insertNotification(notification);
		}
		
		return result;
		
	}
	
	/** 알림 목록 조회
	 *
	 */
	@Override
	public List<Notification> selectNotificationList(int memberNo) {
		return dao.selectNotificationList(memberNo);
	}
	
	/** 읽지 않은 알림 수 조회
	 *
	 */
	@Override
	public int countNotification(int memberNo) {
		return dao.countNotification(memberNo);
	}

	
	/** 알림 읽음 처리
	 *
	 */
	@Override
	public int changeNotificationStatus(int notificationNo) {
		return dao.changeNotificationStatus(notificationNo);
	}
}
