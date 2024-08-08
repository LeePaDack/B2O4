package b2o4.service;

import java.util.List;
import java.util.Map;

import b2o4.dto.MemberReview;


public interface MemberReviewService {
	// 참가자 리스트 보기
	List<MemberReview> memberGetList();

	// 참가자 평가 업로드
	Map<String, Object> memberReviewUpload(MemberReview memeberReview);

	boolean updateMemberLikeCount(MemberReview memeberReview);

	boolean updateMemberDislikeCount(MemberReview memeberReview);

}
