import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Colors, fontGenerator } from '@/styles';

export const TermsDetailContainer = styled.main`
  .div {
    display: flex;
    flex-direction: column;
    color: rgba(107, 118, 132, 1);
    letter-spacing: -0.48px;
    justify-content: start;
    font:
      500 16px/1 Pretendard,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
  }
  .div-2 {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
  }
  .checklist {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    width: 100%;
    align-items: center;
    gap: 6px;
    justify-content: start;
    padding: 10px 0;
  }
  .img {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    border-radius: 40px;
    align-self: stretch;
    margin: auto 0;
  }
  .필수-백곰-개인정보-수집-및-활용-동의 {
    align-self: stretch;
    flex: 1;
    flex-basis: 0%;
    margin: auto 0;
  }
  .img-2 {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
  }
  .div-3 {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
  }
  .필수-예방접종도우미-이용약관 {
    align-self: stretch;
    flex: 1;
    flex-basis: 0%;
    margin: auto 0;
  }
  .img-3 {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
  }
  .div-4 {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
  }
  .필수-예방접종도우미-개인정보-수집-및-이용 {
    align-self: stretch;
    flex: 1;
    flex-basis: 0%;
    margin: auto 0;
  }
  .img-4 {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
  }
  .div-5 {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
  }
  .필수-예방접종도우미-개인정보처리방침 {
    align-self: stretch;
    flex: 1;
    flex-basis: 0%;
    margin: auto 0;
  }
  .img-5 {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
  }
`;
