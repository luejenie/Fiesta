package edu.kh.fiesta.notification.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.fiesta.member.model.vo.Member;
import edu.kh.fiesta.notification.model.service.NotificationService;
import edu.kh.fiesta.notification.model.vo.Notification;

@RestController
public class NotificationController {
	
	@Autowired
	private NotificationService service;
	
	
	/** 로그인한 회원의 알림 목록 조회
	 * @param loginMember
	 * @return notificationList
	 */
	@GetMapping("/notification/list")
	public String selectNotificationList(
			@SessionAttribute("loginMember")Member loginMember) {
		
		List<Notification> notificationList = service.selectNotificationList(loginMember.getMemberNo());
		
		return new Gson().toJson(notificationList);
	}
	
	/** 읽지 않은 알림 수 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/notification/status")
	public int countNotification(@SessionAttribute("loginMember")Member loginMember) {
		return service.countNotification(loginMember.getMemberNo());		
	}
	
	
	@GetMapping("/notification/status/y")
	public int changeNotificationStatus(int notificationNo) {
		return service.changeNotificationStatus(notificationNo);
	}

}
