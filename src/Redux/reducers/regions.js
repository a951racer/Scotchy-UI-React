import { REQUEST_REGIONS,
  UPDATE_REGION,
  REGIONS_RECEIVED,
  REGION_UPDATED,
  CREATE_REGION,
  REGION_CREATED,
  DELETE_REGION,
  REGION_DELETED
} from '../actionTypes/regions'

const initialState = {
  regions: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const regions = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGIONS: {
      return {
        ...state,
        isLoading: true }
    }

    case REGIONS_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        regions: action.regions
      }
    }

    case UPDATE_REGION: {
      return {
        ...state,
        isUpdating: true } 
    }

    case REGION_UPDATED: {
      const currState = {...state}
      let updatedRegions = currState.regions.map(region => {
        if (region._id === action.region._id) return action.region
        return region
      })
      return {
        ...state,
        isUpdating: false,
        regions: updatedRegions
      }
    }

    case CREATE_REGION: {
      return {
        ...state,
        isCreating: true
      }
    }

    case REGION_CREATED: {
      return {
        ...state,
        regions: [...state.regions, action.newRegion],
        isCreating: false
      }
    }

    case DELETE_REGION: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case REGION_DELETED: {
      const currState = {...state}
      let updatedRegions = currState.regions.filter(region => {
        if (region._id !== action.deletedRegion._id) return true
        return false
      })
      return {
        ...state,
        regions: updatedRegions,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default regions