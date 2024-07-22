import styled from '@emotion/styled';

export const RHFInputWrapper = styled.input`
  width: 100%;
  position: relative;
  div {
    width: 100%;
    padding-block: 8px;
  }
  input,
  textarea {
    all: initial;
    width: 100%;
    color: $gray-200;
    padding-block: 8px;
    border-radius: 8px;
    padding-inline: 12px;
    box-sizing: border-box;
    box-shadow: $boxShadow;
    background-color: $white;

    &::placeholder {
      color: $placeholder;
    }
  }

  .RHFCloseIcon {
    position: absolute;
    right: 10px;
    top: 8px;
    cursor: pointer;
  }
`;
