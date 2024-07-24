import { Colors, fontGenerator } from '@/styles';
import styled from '@emotion/styled';

export const SingupKakaoWrapper = styled.main`
  height: 62px;
  .input_title {
    ${fontGenerator('14px', '600', '16.71px')}
    padding-bottom: 8px;
  }
  & > .top {
    padding: 20px;
    //height: 24px;
    ${fontGenerator('20px', '700', '28px')}
  }
  & > .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .item {
    align-self: stretch;
    border-radius: 14px;
    display: flex;
    gap: 20px;
    padding: 20px;
    border: 1px solid rgba(229, 232, 235, 1);
  }
  .logo {
    justify-content: center;
    align-items: center;
    border-radius: 61.25px;
    background-color: #ffe812;
    display: flex;
    width: 70px;
    height: 70px;
    padding: 9px;
  }
  .img {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 44px;
  }
  .text {
    justify-content: center;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    margin: auto 0;
  }
  .number {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    border-radius: 6px;
    background-color: ${Colors.Gray100};
    color: ${Colors.Gray500};
    display: flex;
    height: 25px;
    width: fit-content;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .label {
    color: ${Colors.Gray900};
    margin-top: 8px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  .bottom {
    padding: 20px;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 56px;
    width: 100%;
    max-width: 500px;
  }
`;
