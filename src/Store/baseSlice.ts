/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import labelApi from '../data/labelApi'
import userApi from '../data/userApi'
import { setServiceUnavailable } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { BASE_ARRAY } from '../constants/baseConstants'
import type { AppThunk, RootState } from './store'
import { GoogleLabel } from './labelsTypes'
import { IBaseState } from './baseTypes'
import multipleIncludes from '../utils/multipleIncludes'

const initialState: IBaseState = Object.freeze({
  baseLoaded: false,
  profile: {
    emailAddress: '',
    messagesTotal: 0,
    threadsTotal: 0,
    historyId: '',
  },
  isAuthenticated: false,
})

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseLoaded: (state, { payload }) => {
      if (!state.baseLoaded) {
        state.baseLoaded = payload
      }
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload
    },
    setProfile: (state, { payload }) => {
      state.profile = payload
    },
  },
})

export const { setBaseLoaded, setIsAuthenticated, setProfile } =
  baseSlice.actions

// The base can only be set to be loaded whenever all the labels are created.
export const recheckBase = (): AppThunk => async (dispatch, getState) => {
  if (
    getState().labels.storageLabels.length === BASE_ARRAY.length &&
    !getState().base.baseLoaded
  ) {
    dispatch(setBaseLoaded(true))
  }
}

export const checkBase = (): AppThunk => async (dispatch) => {
  try {
    const user = await userApi().fetchUser()
    const { labels } = await labelApi().fetchLabels()
    if (user && user.status === 200) {
      dispatch(setProfile(user.data))
      if (labels && labels.length > 0) {
        if (
          !multipleIncludes(
            BASE_ARRAY,
            labels.map((item: GoogleLabel) => item.name)
          )
        ) {
          const checkArray = BASE_ARRAY.map((item) =>
            labels.map((label: GoogleLabel) => label.name).includes(item)
          )
          checkArray.map(
            (checkValue, index) =>
              !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
          )

          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labels.filter((item: GoogleLabel) => item.name === baseLabel)
          ).filter((result) => result.length > 0)

          dispatch(setStorageLabels(prefetchedBoxes))
        } else {
          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labels.filter((item: GoogleLabel) => item.name === baseLabel)
          )
          dispatch(setStorageLabels(prefetchedBoxes))
          dispatch(setBaseLoaded(true))
        }
      } else {
        dispatch(
          setServiceUnavailable(
            `Network Error. ${labels}. Please try again later.`
          )
        )
      }
    } else {
      dispatch(
        setServiceUnavailable(`Network Error. ${user}. Please try again later.`)
      )
    }
  } catch (err) {
    dispatch(setServiceUnavailable('An error occured during loading the base.'))
  }
}

export const selectBaseLoaded = (state: RootState) => state.base.baseLoaded
export const selectIsAuthenticated = (state: RootState) =>
  state.base.isAuthenticated
export const selectProfile = (state: RootState) => state.base.profile

export default baseSlice.reducer
