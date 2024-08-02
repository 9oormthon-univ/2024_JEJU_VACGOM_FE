export const PATH_API = {
  API_DOMAIN: 'https://api-dev-v2.vacgom.co.kr',
  // auth
  // 아기 생성 및 백신 조회 후 저장
  SIGNUP: '/api/v2/auth/signup',
  // Dummy Member Request (회원 role 별 토큰발급)
  DUMMY_MEMBER: '/api/v2/dummy/member',
  // 카카오 간편인증 1차 요청
  KAKAO: '/api/v2/auth/simpleAuth/kakao',
  // 카카오 간편인증 2차 요청
  KAKAO_VERIFY: '/api/v2/auth/simpleAuth/kakao/verify',
  // 백신 인증서 조회
  INOCULATIONS: '/api/v2/inoculations',
  INOCULATIONS_DETAIL: '/api/v2/inoculation',
};

/**
- /oauth/{provider}/sign-in-uri
- /oauth/{provider}/sign-in
 */
