package edu.kh.fiesta.notification.model.service;

import edu.kh.fiesta.notification.model.vo.Notification;

public interface NotificationService {

	/** 전송받은 알림을 해석해서 DB에 저장하는 service
	 * @param notification
	 * @return
	 */
	int insertNotification(Notification notification);

}
