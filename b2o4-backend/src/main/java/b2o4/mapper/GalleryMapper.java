package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GalleryBoard;

@Mapper
public interface GalleryMapper {

	void GalleryUpload(GalleryBoard galleryBoard);
    List<GalleryBoard> AllGalleryBoard();
	
	// 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
}