import shortid from "shortid"
import produce from "immer"

export const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  profileImgLoading: false,
  profileImgDone: false,
  profileImgError: null,
  profileEditLoading: false,
  profileEditDone: false,
  profileEditError: null,
  me: null,
}
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const PROFILE_IMG_REQUEST = "PROFILE_IMG_REQUEST"
export const PROFILE_IMG_SUCCESS = "PROFILE_IMG_SUCCESS"
export const PROFILE_IMG_FAILURE = "PROFILE_IMG_FAILURE"

export const PROFILE_EDIT_REQUEST = "PROFILE_EDIT_REQUEST"
export const PROFILE_EDIT_SUCCESS = "PROFILE_EDIT_SUCCESS"
export const PROFILE_EDIT_FAILURE = "PROFILE_EDIT_FAILURE"

export const LoginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  ...data,
})

const dummyUser = (data) => ({
  ...data,
  nickname: "챙",
  post: [
    {
      id: data.id,
    },
  ],
  Followings: [{ nickname: "suzy" }],
  Followers: [{ nickname: "jenny" }],
})

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true
        draft.loadUserError = null
        draft.loadUserDone = false
        break
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false
        draft.me = action.data
        draft.loadUserDone = true
        break
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false
        draft.loadUserError = action.error
        break
      case LOG_IN_REQUEST:
        draft.loginLoading = true
        draft.loginDone = false
        draft.loginError = null
        break
      case LOG_IN_SUCCESS:
        draft.loginLoading = false
        draft.loginDone = true
        draft.me = action.data
        break
      case LOG_IN_FAILURE:
        draft.loginLoading = false
        draft.loginError = action.error
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break
      case PROFILE_IMG_REQUEST:
        draft.profileImgLoading = true
        draft.profileImgDone = false
        draft.profileImgError = null
        break
      case PROFILE_IMG_SUCCESS:
        draft.profileImgLoading = false
        draft.profileImgDone = true
        draft.me.Image = action.data
        break
      case PROFILE_IMG_FAILURE:
        draft.profileImgLoading = false
        draft.profileImgError = action.error
        break
      case PROFILE_EDIT_REQUEST:
        draft.profileEditLoading = true
        draft.profileEditDone = false
        draft.profileEditError = null
        break
      case PROFILE_EDIT_SUCCESS:
        draft.profileEditLoading = false
        draft.profileEditDone = true
        draft.me.Image = action.data.image
        break
      case PROFILE_EDIT_FAILURE:
        draft.profileEditLoading = false
        draft.profileEditError = action.error
        break
      default:
        break
    }
  })

export default reducer
