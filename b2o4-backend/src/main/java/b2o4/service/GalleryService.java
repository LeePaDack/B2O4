package b2o4.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;

public interface GalleryService {
	// 게시판 업로드
	int GalleryUpload(String GBPostTitle, String GBPostContent, MultipartFile file);
		
	// 갤러기 게시판 보기
	List<GalleryBoard> AllGalleryBoard();
	
	// 갤러리 상세보기
	GalleryBoard GalleryDetail(int GBPostNo);
}
