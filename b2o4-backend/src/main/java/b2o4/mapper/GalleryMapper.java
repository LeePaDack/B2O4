package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GalleryBoard;

@Mapper
public interface GalleryMapper {

	// 게시판 업로드
	int GalleryUpload(GalleryBoard galleryBoard);
	
	// 갤러기 게시판 보기
	List<GalleryBoard> AllGalleryBoard();
}
