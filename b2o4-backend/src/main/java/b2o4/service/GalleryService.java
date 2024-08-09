package b2o4.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;

public interface GalleryService {
	void createGalleryBoard(GalleryBoard galleryBoard);
    List<GalleryBoard> AllGalleryBoards();
    void uploadImages(MultipartFile[] files, String title, String content);
	
    // 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
	
	// 갤러리 삭제하기
	int deleteGallery(int gbPostNo);
}