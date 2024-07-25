import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Colors, fontGenerator } from '@/styles';

export const TermsDetailContainer = styled.main`
  & > .wrap {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    padding-top: 10px;

    & > .all {
      padding-bottom: 10px;
      align-items: start;
      display: flex;
      gap: 10px;
      padding-bottom: 10px;

      & > .button {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      & > .title {
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        text-align: left;
        color: #333d4b;
      }
    }
    .personal {
      width: 100%;
      backdrop-filter: blur(50px);
      display: flex;
      justify-content: space-between;
      gap: 6px;
      font-size: 14px;
      color: ${Colors.Gray500};
      font-weight: 400;
      line-height: 140%;
      padding: 8px 0;
      .title {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        text-align: left;
        color: ${Colors.Gray500};
      }
      img {
        aspect-ratio: 1;
        object-fit: auto;
        object-position: center;
        width: 24px;
      }
    }
  }
`;
