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
      padding: 30px 27px;
      position: absolute;
      bottom: 130px;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      & > img {
        width: 90vw;
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
`;
