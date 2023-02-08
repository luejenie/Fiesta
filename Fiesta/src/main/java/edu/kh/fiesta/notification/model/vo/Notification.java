package edu.kh.fiesta.notification.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Notification {
	private int notificationNo;
	private int typeNo;
	private int targetNo;
	private int senderNo;
	private String senderNickname;
	private String notificationContent;
	private String notificationDate;
	private int memberNo;
	private String quickLink;
	private String notificationStatus;
	private String memberProfileImg;

}
