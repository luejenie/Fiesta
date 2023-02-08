package edu.kh.fiesta.notification.model.service;

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
		
		// 댓글
		case 1: 
			board = dao.selectBoard(targetNo);
			notification.setMemberNo(board.getMemberNo());
			notification.setNotificationContent(
					notification.getSenderNickname() + "님이 회원님의 게시글에 댓글을 남겼습니다.");
			notification.setQuickLink("/feedDetail/" + targetNo);
			
			break;
			
		// 답글
		case 2: 
			comment = dao.selectComment(targetNo);
			notification.setMemberNo(comment.getCommentMemberNo());
			notification.setNotificationContent(notification.getSenderNickname() + "님이 댓글을 달았습니다. " +
			notification.getNotificationContent());
			break;
			
			
		// 게시글 좋아요
		case 3:
			board = dao.selectBoard(targetNo);
			notification.setMemberNo(board.getMemberNo());
			notification.setNotificationContent(
					notification.getSenderNickname() + "님이 회원님의 게시글을 좋아합니다.");
			notification.setQuickLink("/feedDetail/" + targetNo);
			break;
			
		// 댓글 좋아요
		case 4:
			comment = dao.selectComment(targetNo);
			notification.setMemberNo(comment.getCommentMemberNo());
			
			notification.setNotificationContent(notification.getSenderNickname() + "님이 회원님의 댓글을 좋아합니다 ");
			
			break;	
		}
		
		return dao.insertNotification(notification);
		
	}

}
