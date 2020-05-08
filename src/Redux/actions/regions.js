import { REQUEST_REGIONS, UPDATE_REGION, REGIONS_RECEIVED } from '../actionTypes/regions'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestRegions = () => {
  return {
    type: REQUEST_REGIONS
  }
}

export const updateRegion = () => {
  return {
    type: UPDATE_REGION
  }
}

export const regionsReceived = (regions) => {
  return {
    type: REGIONS_RECEIVED,
    regions: regions
  }
}

export const fetchRegions = () => async dispatch => {
  dispatch(requestRegions())
  const regions = await api.getRegions()
  dispatch(regionsReceived(regions))
}
  