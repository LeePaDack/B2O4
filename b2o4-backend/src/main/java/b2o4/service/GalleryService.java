package b2o4.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.dto.GalleryComment;

public interface GalleryService {
	
	// 갤러리 업로드
	void createGalleryBoard(GalleryBoard galleryBoard);
    void uploadImages(MultipartFile[] files, String title, String content, int memberNo, String memberName);
	
    // 갤러리 목록보기
    List<GalleryBoard> AllGalleryBoards();
    
    // 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
	
	// 갤러리 삭제하기
	int deleteGallery(int gbPostNo);
	
	// 갤러리 댓글 작성
	void createGalleryComment(GalleryComment galleryComment);
    void uploadCommentImages(MultipartFile[] files, String content, int gbPostNo, int memberNo, String memberName);
    
 // 갤러리 댓글 보기
 	List<GalleryComment> AllGalleryComment();
}