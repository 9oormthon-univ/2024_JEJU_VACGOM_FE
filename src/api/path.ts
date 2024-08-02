export const PATH_API = {
  API_DOMAIN: 'https://api-dev-v2.vacgom.co.kr',
  // auth
  // member
  MEMBER: '/api/v2/member',
  // 아기 생성 및 백신 조회 후 저장
  SIGNUP: '/api/v2/auth/signup',
  // Dummy Member Request (회원 role 별 토큰발급)
  DUMMY_MEMBER: '/api/v2/dummy/member',
  // 카카오 간편인증 1차 요청
  KAKAO: '/api/v2/auth/simpleAuth/kakao',
  // 카카오 간편인증 2차 요청
  KAKAO_VERIFY: '/api/v2/auth/simpleAuth/kakao/verify',

  // vaccine
  // 백신 인증서 조회
  INOCULATIONS: '/api/v2/inoculations',
  INOCULATIONS_DETAIL: '/api/v2/inoculation',

  // 접종 내역 조회
  VACCINATIONS: '/api/v2/inoculation/simple',
  VACCINATIONS_DETAIL: '/api/v2/inoculations/all',
  // 이 사람의 맞은 백신 개수랑 아직 안맞은 백신 개수
  MAIN: '/api/v2/main',
  // 이 사람의 이름이랑 자녀 정보
  INFO: '/api/v2/member',
};

/**
- /oauth/{provider}/sign-in-uri
- /oauth/{provider}/sign-in
 */
