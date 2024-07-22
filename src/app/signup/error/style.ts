import styled from '@emotion/styled';
import { Colors, fontGenerator } from '@/styles';

export const SignupErrorPageWrap = styled.main`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 1000;
  background-color: ${Colors.Primary};

  & > header {
    & > span > img {
      color: ${Colors.White};
    }
  }
  & > .container {
  }
`;
