package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GalleryBoard;

@Mapper
public interface GalleryMapper {

	// 갤러리 게시판 업로드
	void GalleryUpload(GalleryBoard galleryBoard);
	
	// 갤러리 게시판 목록 및 상세보기
    List<GalleryBoard> AllGalleryBoard();
	
	// 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
	
	
	// 갤러리 삭제하기
	int deleteGallery(int gbPostNo);
}