import styled from '@emotion/styled';
import { Colors, fontGenerator } from '@/styles';

export const SignupErrorPageWrap = styled.main`
  width: 100%;
  height: 100vh;
  top: 0;
  position: relative;
  z-index: 1000;
  background-color: ${Colors.Primary};

  & > header {
    & > span > img {
      color: ${Colors.White};
    }
  }
  & > .container {
    & > .top {
      margin: 10vh 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > .cate {
        border-radius: 82.701px;
        background-color: rgba(229, 240, 255, 0.3);
        color: ${Colors.White};
        padding: 8px 14px;
        text-align: center;
        font:
          700 14px Pretendard,
          sans-serif;
        max-width: 108px;
        margin-bottom: 20px;
      }
      & > .title {
        ${fontGenerator('32px', '700', '42px')}
        color: ${Colors.White};
        margin-bottom: 14px;
        text-align: center;
      }
      & > .subTitle {
        ${fontGenerator('14px', '500', '22px')}
        color: rgba(255, 255, 255, 0.70);
        text-align: center;
      }
    }

    & > .body {
      //padding: 30px 27px;
      position: absolute;
      bottom: 100px;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      & > img {
        width: 100%;
      }
    }
    & > .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: ${Colors.White};
      padding: 10px 20px 35px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  @media (max-height: 671px) {
    & > .container {
      & > .top {
        margin: 5vh 0;
      }
      .body {
        & > img {
          max-height: 320px;
        }
      }
    }
  }
`;
