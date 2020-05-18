import { REQUEST_REGIONS,
  UPDATE_REGION,
  REGIONS_RECEIVED,
  REGION_UPDATED,
  CREATE_REGION,
  REGION_CREATED,
  DELETE_REGION,
  REGION_DELETED
} from '../actionTypes/regions'

import regionApi from '../../API/region'

const api = new regionApi();

export const requestRegions = () => {
  return {
    type: REQUEST_REGIONS
  }
}

export const regionsReceived = (regions) => {
  return {
    type: REGIONS_RECEIVED,
    regions: regions
  }
}

export const updateRegion = () => {
  return {
    type: UPDATE_REGION
  }
}

export const regionUpdated = (region) => {
  return {
    type: REGION_UPDATED,
    region: region
  }
}

export const creatingRegion = () => {
  return {
    type: CREATE_REGION
  }
}

export const regionCreated = (newRegion) => {
  return {
    type: REGION_CREATED,
    newRegion
  }
}

export const deletingRegion = () => {
  return {
    type: DELETE_REGION
  }
}

export const regionDeleted = (deletedRegion) => {
  return {
    type: REGION_DELETED,
    deletedRegion
  }
}

export const fetchRegions = () => async (dispatch, getState) => {
  const state = getState()
  if (state.regions.regions && state.regions.regions.length > 0) return
  dispatch(requestRegions())
  const regions = await api.getRegions()
  dispatch(regionsReceived(regions))
}

export const saveRegion = region => async dispatch => {
  dispatch(updateRegion())
  const updatedRegion = await api.saveRegion(region)
  dispatch(regionUpdated(updatedRegion))
}

export const createRegion = region => async dispatch => {
  dispatch(creatingRegion())
  const newRegion = await api.createRegion(region)
  dispatch(regionCreated(newRegion))
}

export const deleteRegion = region => async dispatch => {
  dispatch(deletingRegion())
  const deletedRegion = await api.deleteRegion(region)
  dispatch(regionDeleted(deletedRegion))
}