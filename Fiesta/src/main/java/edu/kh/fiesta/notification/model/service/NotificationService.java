package edu.kh.fiesta.notification.model.service;

import java.util.List;

import edu.kh.fiesta.notification.model.vo.Notification;

public interface NotificationService {

	/** 전송받은 알림을 해석해서 DB에 저장하는 service
	 * @param notification
	 * @return
	 */
	int insertNotification(Notification notification);

	/** 로그인한 회원의 알림 목록 조회
	 * @param memberNo
	 * @return notificationList
	 */
	List<Notification> selectNotificationList(int memberNo);

	/** 읽지 않은 알림 수 조회
	 * @param memberNo
	 * @return 
	 */
	int countNotification(int memberNo);

	/** 알림 읽음 처리
	 * @param notificationNo
	 * @return
	 */
	int changeNotificationStatus(int notificationNo);

}
