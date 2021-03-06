import React, { useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { END } from "redux-saga"
import axios from "axios"

import { TextField } from "@material-ui/core"

import styled from "styled-components"
import {
  LOAD_USER_REQUEST,
  PROFILE_EDIT_REQUEST,
  PROFILE_IMG_REQUEST,
  USER_INFO_REQUEST,
} from "../../../reducers/user"
import wrapper from "../../../store/configureStore"
import { ButtonPurple, minContainer } from "../../../styles/style"
import ProfileAvatar from "../../../components/Profile/Avatar"

const Layout = dynamic(() => import("../../../components/Layout"))
const AlertLogin = dynamic(() => import("../../../components/AlertLogin"), {
  ssr: false,
})

const EditForm = styled.div`
  ${minContainer}
`
const EditInput = styled.div`
  max-width: 280px;
  margin: auto;
`
const Edit = () => {
  const { register, handleSubmit, watch } = useForm()
  const dispatch = useDispatch()
  const { me, profileImgDone } = useSelector((state) => state.user)

  if (!me) {
    return <AlertLogin />
  }

  const inputFile = useRef(null)
  const onFileUpload = useCallback(() => {
    inputFile.current.click()
  }, [])
  const onClickImage = useCallback((e) => {
    e.target.value = null
  }, [])
  const onSubmit = useCallback(
    (data) => {
      const editFormData = new FormData()
      const nickname = watch("nickname") || me.nickname
      //  console.log(nickname, me.nickname, data.nickname)
      editFormData.append("nickname", nickname)
      editFormData.append("image", me.src)
      dispatch({
        type: PROFILE_EDIT_REQUEST,
        data: editFormData,
      })
      if (profileImgDone) {
        alert("프로필이 수정되었습니다.")
      }
    },
    [me, profileImgDone],
  )

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData()
    imageFormData.append("singleimage", e.target.files[0])
    dispatch({
      type: PROFILE_IMG_REQUEST,
      data: imageFormData,
    })
  }, [])

  return (
    <Layout>
      <EditForm>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div onClick={onFileUpload}>
            <ProfileAvatar
              size={140}
              alt={me.nickname}
              src={me.src && me.src.replace(/\/thumb\//, "/original/")}
            />
          </div>
          <input
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={onChangeImage}
            onClick={onClickImage}
          />
          <EditInput>
            <TextField
              id="nickname"
              label="닉네임"
              {...register("nickname")}
              fullWidth
              defaultValue={me.nickname}
            />
            <ButtonPurple
              type="submit"
              style={{
                width: "100%",
                height: "40px",
                margin: "2rem auto 0",
              }}
            >
              저장
            </ButtonPurple>
          </EditInput>
        </form>
      </EditForm>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : ""
    axios.defaults.headers.Cookie = ""

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
      type: USER_INFO_REQUEST,
      data: context.params.id,
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

export default Edit
