import { REQUEST_PRICES,
  UPDATE_PRICE,
  PRICES_RECEIVED,
  PRICE_UPDATED,
  CREATE_PRICE,
  PRICE_CREATED,
  DELETE_PRICE,
  PRICE_DELETED
} from '../actionTypes/prices'

import priceApi from '../../API/price'

const api = new priceApi();

export const requestPrices = () => {
  return {
    type: REQUEST_PRICES
  }
}

export const pricesReceived = (prices) => {
  return {
    type: PRICES_RECEIVED,
    prices: prices
  }
}

export const updatePrice = () => {
  return {
    type: UPDATE_PRICE
  }
}

export const priceUpdated = (price) => {
  return {
    type: PRICE_UPDATED,
    price: price
  }
}

export const creatingPrice = () => {
  return {
    type: CREATE_PRICE
  }
}

export const priceCreated = (newPrice) => {
  return {
    type: PRICE_CREATED,
    newPrice
  }
}

export const deletingPrice = () => {
  return {
    type: DELETE_PRICE
  }
}

export const priceDeleted = (deletedPrice) => {
  return {
    type: PRICE_DELETED,
    deletedPrice
  }
}

export const fetchPrices = force => async (dispatch, getState) => {
  const state = getState()
  if (state.prices.prices && state.prices.prices.length > 0 && !force) return
  dispatch(requestPrices())
  const prices = await api.getPrices()
  dispatch(pricesReceived(prices))
}

export const savePrice = price => async dispatch => {
  dispatch(updatePrice())
  const updatedPrice = await api.savePrice(price)
  dispatch(requestPrices())
  const newPrices = await api.getPrices()
  dispatch(pricesReceived(newPrices))
  dispatch(priceUpdated(updatedPrice))
}

export const createPrice = price => async dispatch => {
  dispatch(creatingPrice())
  const newPrice = await api.createPrice(price)
  dispatch(requestPrices(true))
  const newPrices = await api.getPrices()
  dispatch(pricesReceived(newPrices))
  dispatch(priceCreated(newPrice))
}

export const deletePrice = price => async dispatch => {
  dispatch(deletingPrice())
  const deletedPrice = await api.deletePrice(price)
  dispatch(requestPrices(true))
  const newPrices = await api.getPrices()
  dispatch(pricesReceived(newPrices))
  dispatch(priceDeleted(deletedPrice))
}