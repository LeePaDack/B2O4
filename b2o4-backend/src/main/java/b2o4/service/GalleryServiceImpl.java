package b2o4.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.mapper.GalleryMapper;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	private GalleryMapper galleryMapper;

    @Value("${file.upload-dir}") //properties 에 설정한 이미지 저장 경로
    private String uploadDir;

    public GalleryServiceImpl(GalleryMapper galleryMapper) {
        this.galleryMapper = galleryMapper;
    }

    @Override
    public void createGalleryBoard(GalleryBoard galleryBoard) {
    	galleryMapper.GalleryUpload(galleryBoard);
    }

    @Override
    public List<GalleryBoard> AllGalleryBoards() {
        return galleryMapper.AllGalleryBoard();
    }

    @Override
    public void uploadImages(MultipartFile[] files, String title, String content) {
        if (files.length == 0) {
            throw new IllegalArgumentException("파일이 없습니다.");
        }

        // 디렉토리 존재 확인 및 생성
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            if (!uploadDirFile.mkdirs()) {
                throw new RuntimeException("디렉토리 생성에 실패하였습니다.");
            }
        }

        List<String> fileNames = null;
        try {
            fileNames = List.of(files).stream().map(file -> {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                File destinationFile = new File(uploadDir + File.separator + fileName);
                try {
                    file.transferTo(destinationFile);
                } catch (IOException e) {
                    throw new RuntimeException("파일 업로드 실패", e);
                }
                return fileName;
            }).collect(Collectors.toList());
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 업로드 실패", e);
        }

        try {
            GalleryBoard galleryBoard = new GalleryBoard();
            galleryBoard.setGbPostTitle(title);
            galleryBoard.setGbPostContent(content);
            galleryBoard.setGbImages(String.join(",", fileNames));
            createGalleryBoard(galleryBoard);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패 ", e);
        }
    }

	// 갤러리 상세보기
	public GalleryBoard GalleryDetail(int GBPostNo) {
		return galleryMapper.GalleryDetail(GBPostNo);
	}
	
	// 갤러리 삭제하기
	@Override
	public int deleteGallery(int gbPostNo) {
		return galleryMapper.deleteGallery(gbPostNo);
	}
}