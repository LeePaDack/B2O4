package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.service.GalleryService;

@RestController
@RequestMapping("/gallery")
public class GalleryController {
	@Autowired
	private GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImages(@RequestParam("files") MultipartFile[] files,
                                               @RequestParam("title") String title,
                                               @RequestParam("content") String content,
                                               @RequestParam("memberNo") int memberNo,
                                               @RequestParam("memberName") String memberName) {
        try {
        	galleryService.uploadImages(files, title, content, memberNo, memberName);
            return ResponseEntity.ok("이미지 업로드 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
      
    }

    // 갤러리 게시판 목록보기
    @GetMapping("/posts")
    public ResponseEntity<List<GalleryBoard>> getAllPosts() {
    	System.out.println(galleryService.AllGalleryBoards());
        return ResponseEntity.ok(galleryService.AllGalleryBoards());
    }
	
    // 갤러리게시판 상세보기
	@GetMapping("/{gbpostNo}")
	public GalleryBoard GalleryDetail(@PathVariable("gbPostNo") int gbPostNo) {
		return galleryService.GalleryDetail(gbPostNo);
	}
	
	// 갤러리 삭제하기
	@DeleteMapping("/{gbPostNo}")
	public int deleteGallery(@PathVariable("gbPostNo") int gbPostNo) {
		return galleryService.deleteGallery(gbPostNo);
	}
	
}
