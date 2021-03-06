import React, { useCallback } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { END } from "@redux-saga/core"

import axios from "axios"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  ListItemSecondaryAction,
} from "@material-ui/core"

import styled from "styled-components"
import wrapper from "../../../store/configureStore"
import {
  FOLLOW_LIST_REQUEST,
  LOAD_USER_REQUEST,
  USER_INFO_REQUEST,
} from "../../../reducers/user"
import FollowButton from "../../../components/Follow/btn"
import { minContainer } from "../../../styles/style"
import Layout from "../../../components/Layout"
import ProfileAvatar from "../../../components/Profile/Avatar"
import useInfiniteScroll from "../../../hooks/useInfiniteScroll"

const FollowContent = styled.div`
  ${minContainer}
`

const Follow = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id, follow } = router.query
  const { userInfo, followList, followListDone, followListLoading } =
    useSelector((state) => state.user)

  // 처음에만 20개 불러오고 스크롤 내릴때마다 10개..
  const scrollDispatch = useCallback(() => {
    dispatch({
      type: FOLLOW_LIST_REQUEST,
      data: { userId: id, name: follow, limit: 10 },
    })
  }, [])

  const infiniteScroll = useInfiniteScroll(
    followListLoading,
    followListDone,
    scrollDispatch,
  )

  return (
    <Layout>
      <Head>
        <title>{`userInfo.nickname 님의 ${follow}`}</title>
        <meta
          name="description"
          content={`${userInfo.nickname}님의 ${follow}`}
        />
        <meta
          property="og:title"
          content={`${userInfo.nickname}님의 ${follow}`}
        />
        <meta
          property="og:description"
          content={`${userInfo.nickname}님의 ${follow}`}
        />
        <meta
          property="og:url"
          content={`https://emotion-feed.com/users/${id}/${follow}`}
        />
      </Head>
      <FollowContent>
        <List
          subheader={
            <ListSubheader>{`${userInfo.nickname}님의 ${follow}`}</ListSubheader>
          }
        >
          {followList.map((v) => (
            <ListItem key={v.id} disableGutters>
              <ListItemAvatar>
                <Link href={`/users/${v.id}`}>
                  <a>
                    <ProfileAvatar alt={v.nickname} src={v.src} />
                  </a>
                </Link>
              </ListItemAvatar>
              <ListItemText primary={v.nickname} />
              <ListItemSecondaryAction>
                <FollowButton id={v.id} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </FollowContent>
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
    context.store.dispatch({
      type: FOLLOW_LIST_REQUEST,
      data: {
        userId: context.params.id,
        name: context.params.follow,
        limit: 20,
      },
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
    console.log("getState", context.store.getState().user.userInfo)
    return { props: {} }
  },
)

export default Follow
