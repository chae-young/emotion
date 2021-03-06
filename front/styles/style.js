import styled, { css } from "styled-components"
import theme from "./theme"

export const headerHeight = 65
export const InputStyle = css`
  padding: 0;
  background: none;
  border: 0;
  border-bottom: ${theme.pointColor.border};
`
export const minContainer = css`
  max-width: 640px;
  margin: auto;
  padding: 0 20px;
`
const ButtonStyle = css`
  border: ${theme.pointColor.border};
  background: ${theme.pointColor.purple};
  color: rgb(255, 255, 255);
  &:hover {
    background: rgb(0, 0, 0);
  }
`
export const Container = styled.div`
  max-width: 1500px;
  margin: auto;
`
export const PostTitle = styled.h2`
  max-width: 1000px;
  padding: 0 1rem;
  margin: 0 auto 6rem;
  font-size: 4rem;
  @media ${theme.device.mobile} {
    padding: 0 2rem;
    font-size: 3rem;
  }
  > b {
    font-wegiht: bold;
    color: ${theme.pointColor.purple};
  }
`

export const ButtonPurple = styled.button`
  display: block;
  text-align: center;
  ${(props) =>
    props.xs &&
    css`
      width: ${props.xs.width};
      height: ${props.xs.height};
      line-height: ${props.xs.height};
      margin: ${props.xs.margin};
    `}
  ${ButtonStyle};
  @media ${theme.device.mobile} {
    ${(props) =>
      props.sm &&
      css`
        width: ${props.sm.width};
        height: ${props.sm.height};
        line-height: ${props.sm.height};
        margin: ${props.sm.margin};
      `}
  }
`
export const ListPoster = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.heightVal};
  box-sizing: border-box;
  overflow: hidden;
  & img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: auto;
  }
`
export const ListContent = styled.div`
  padding: 20px 0 0;
  font-size: 1.2rem;
  color: rgb(0, 0, 0);
  > p {
    margin-bottom: 0.5em;
  }
`

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  ${InputStyle}
`

export const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`
export const AsideInputField = styled.div`
  margin-top: 2rem;
`
export const ErrorMsg = styled.div`
  color: red;
`
