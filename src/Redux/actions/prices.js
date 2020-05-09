import { REQUEST_PRICES, UPDATE_PRICE, PRICES_RECEIVED } from '../actionTypes/prices'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestPrices = () => {
  return {
    type: REQUEST_PRICES
  }
}

export const updatePrice = () => {
  return {
    type: UPDATE_PRICE
  }
}

export const pricesReceived = (prices) => {
  return {
    type: PRICES_RECEIVED,
    prices: prices
  }
}

export const fetchPrices = () => async (dispatch, getState) => {
  const state = getState()
  if (state.prices.prices && state.prices.prices.length > 0) return
  dispatch(requestPrices())
  const prices = await api.getPrices()
  dispatch(pricesReceived(prices))
}
  