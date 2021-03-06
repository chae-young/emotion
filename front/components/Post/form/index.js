import React, { useCallback, useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import { Rating } from "@material-ui/lab"
import { Grid } from "@material-ui/core"

import styled from "styled-components"
import {
  ADD_POST_REQUEST,
  EDIT_POST_REQUEST,
  IMAGE_UPLOAD_REQUEST,
} from "../../../reducers/post"
import basicPoster from "./images/noimage.png"
import { FormInput, ButtonPurple, headerHeight } from "../../../styles/style"

const FormSelect = dynamic(() => import("../category"))

const PostForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { imagePath, singlePost } = useSelector((state) => state.post)
  const { register, trigger, handleSubmit, watch, setValue } = useForm()

  // 1이면 내이미지 2이면 편집모드
  const [selectedCheck, setSelectedCheck] = useState(null)

  const [editMode, setEditMode] = useState(false)
  const [EditpostImg, setEditpostImg] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0.5)

  useEffect(() => {
    if (router.asPath.includes("post/edit")) {
      setEditMode(true)
      const img = singlePost.Images[0].src
      setEditpostImg(`${img}`)
      setSelectedCheck(2)
      setCategory(singlePost.category)
      setRating(singlePost.rating)
      setValue("title", singlePost.title)
      setValue("content", singlePost.content)
    }
  }, [singlePost])

  const onSubmit = useCallback(
    (data) => {
      const totalData = { ...data, imagePath, rating, category }
      const formData = new FormData()
      for (const key in totalData) {
        formData.append(key, totalData[key])
      }
      if (editMode) {
        const img = imagePath || singlePost.Images[0].src
        const editData = {
          ...data,
          img,
          rating,
          category,
          postId: singlePost.id,
        }
        dispatch({
          type: EDIT_POST_REQUEST,
          editData,
        })
      } else {
        dispatch({
          type: ADD_POST_REQUEST,
          data: totalData,
        })
      }
      router.push("/board")
      window.scrollTo(0, 0)
    },
    [imagePath, rating, category],
  )

  const inputFile = useRef(null)
  const onFileUpload = useCallback(() => {
    inputFile.current.click()
  }, [])
  const onClickImage = useCallback((e) => {
    e.target.value = null
  }, [])

  const onChangeImage = useCallback(
    (e) => {
      // console.log("image", e.target.files[0])
      const imageFormData = new FormData()
      imageFormData.append("singleimage", e.target.files[0])
      if (e.target.files[0].name.length < 100) {
        dispatch({
          type: IMAGE_UPLOAD_REQUEST,
          data: imageFormData,
        })
        setSelectedCheck(1)
      } else {
        alert("파일명을 100자 이하로 해주세요.")
      }
    },
    [imagePath],
  )

  const imgSrc = useCallback(() => {
    switch (selectedCheck) {
      case 1:
        return imagePath.replace(/\/thumb\//, "/original/")
      case 2:
        return EditpostImg.replace(/\/thumb\//, "/original/")
      default:
        return basicPoster
    }
  }, [selectedCheck, imagePath])

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Grid container style={{ marginTop: "-40px" }}>
        <ImgGrid item xs={12} sm={6}>
          <PostFormImg>
            <div>
              <img
                src={imgSrc()}
                alt={watch("title", "기본이미지")}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </PostFormImg>
          <PostFormImgBtn>
            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={onChangeImage}
              onClick={onClickImage}
            />
            {/* <MovieSrhModal setSelectedCheck={setSelectedCheck} /> */}
            <button type="button" onClick={onFileUpload}>
              내 이미지
              {/* <Attachment font-size="small" className={classes.iconStyle} /> */}
            </button>
          </PostFormImgBtn>
        </ImgGrid>
        <InputGrid item xs={12} sm={6}>
          <FormSelect categoryName={category} setCategory={setCategory} />
          <PostFormTit>
            <FormInput
              {...register("title", {
                required: true,
              })}
              placeholder="리뷰 제목을 입력해주세요."
              // {...(editMode && { defaultValue: singlePost.title })}
            />
            <Rating
              value={rating}
              name="별점"
              precision={0.5}
              size="large"
              onChange={(_event, newValue) => {
                setRating(newValue)
              }}
            />
          </PostFormTit>
          <PostTextArea
            {...register("content", {
              required: true,
            })}
            placeholder="내용을 입력해주세요."
            // {...(editMode && { defaultValue: singlePost.content })}
          />
          <ButtonPurple
            type="submit"
            xs={{ width: "100%", height: "65px", margin: "2em auto 0" }}
            onClick={async () => {
              const titleVal = await trigger("title")
              const contentVal = await trigger("content")
              if (!category) {
                alert("카테고리를 선택해주세요")
              } else if (!titleVal) {
                alert("영화제목을 입력해주세요")
              } else if (!contentVal) {
                alert("내용을 입력해주세요")
              } else if (imgSrc() === basicPoster) {
                alert("사진을 등록해주세요")
              }
            }}
          >
            등록
          </ButtonPurple>
        </InputGrid>
      </Grid>
    </form>
  )
}

const ImgGrid = styled(Grid)`
  position: relative;
  height: calc(100vh - ${headerHeight});
  overflow: hidden;
  padding: 2rem 2rem 5rem;

  @media ${({ theme }) => theme.device.MinMobile} {
    border-right: 1px solid rgb(0, 0, 0);
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: 50vh;
  }
`

const InputGrid = styled(Grid)`
  height: calc(100vh - ${headerHeight});
  padding: 3rem 6rem 6rem;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 8rem 2rem 0;
  }
`

const PostFormImg = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PostFormImgBtn = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;

  & button {
    flex: 1;
    justify-content: center;
    padding: 2rem 0;
    border: ${({ theme }) => theme.pointColor.border};
    background: ${({ theme }) => theme.pointColor.bg};
    border-right: 0;
    font-size: 1.4rem;
    font-weigth: bold;

    @media ${({ theme }) => theme.device.mobile} {
      padding: 1rem 0;
      border-right: ${({ theme }) => theme.pointColor.border};

      + button {
        border-left: 0;
      }
    }
  }
`
const PostFormTit = styled.div``
const PostTextArea = styled.textarea`
  width: 100%;
  height: 50vh;
  margin-top: 2rem;
  padding: 2rem;
  overflow-y: auto;
  background: none;
  border: 1px solid rgb(0, 0, 0);
  box-sizing: border-box;
  resize: none;
`

export default PostForm
