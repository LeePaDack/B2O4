package b2o4.service;

import java.util.List;

import b2o4.dto.GalleryBoard;

public interface GalleryService {
	// 게시판 업로드
	void GalleryUpload(GalleryBoard galleryBoard);
		
	// 갤러기 게시판 보기
	List<GalleryBoard> AllGalleryBoard();
}
