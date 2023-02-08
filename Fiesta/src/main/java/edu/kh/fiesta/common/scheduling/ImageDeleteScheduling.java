package edu.kh.fiesta.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.fiesta.board.model.service.BoardService;
import edu.kh.fiesta.member.model.service.MemberService;

//	이미지 삭제 스케줄러
@Component
public class ImageDeleteScheduling {

	@Autowired // DI
	private BoardService boardService;
	
	@Autowired // DI
	private MemberService memberService;
	
	
	@Autowired
	private ServletContext application; // applcation scope 媛앹껜
	
	private Logger logger = LoggerFactory.getLogger(ImageDeleteScheduling.class);

	

//	프로필 사진 삭제 스케줄러
	@Scheduled(cron = "0 0 * * * * ")
	public void deleteprofileImgFile() {
		
		List<String> dbList = memberService.selectProfileImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/profile");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("프로필 이미지 삭제 스케줄링 실행");
	}
	
	
	
	
//	게시글 이미지 삭제 스케줄러
	@Scheduled(cron = "0 0 * * * * ")
	public void deleteBgImgFile() {
		
		List<String> dbList = boardService.selectImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/board");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("게시글 이미지 삭제 스케줄링 실행");
	}
	
	
	


}


