import styled from '@emotion/styled';
import { Colors, fontGenerator } from '@/styles';

export const ViewingPageWrap = styled.main`
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 1000;

  & > .container {
    position: relative;

    & > .top {
      margin: 4vh 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      & > .percent {
        ${fontGenerator('48px', '400', '140%')}
        color: ${Colors.Primary};
      }
      & > .title {
        ${fontGenerator('24px', '500', '32px')}
        color: ${Colors.Black};
        margin-bottom: 14px;
        white-space: nowrap;
        p {
          display: inline-block;
          ${fontGenerator('24px', '700', '32px')}
        }
      }
      & > .subTitle {
        ${fontGenerator('12px', '500', '18px')}
        color: #FFFFFF66;
      }
    }
    & > .body {
      padding: 20px;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        max-height: 60vh;
        //position: absolute;
        //bottom: 0;
      }
    }
    & > .bottom {
      background-color: ${Colors.White};
      width: 100%;
      //height: 95px;
      bottom: 0;
      & > .progress {
        z-index: 2;
        margin: 42px 20px;
      }
    }
  }
`;
