import { createSlice } from '@reduxjs/toolkit'

export const web3AccountAdder = createSlice({
  name: 'account',
  initialState: {
    address: null,
    balance: "0",
    contract: null,
    recentGames: null,
    provider : null,
    isConnected: false,
    totalBets: 0,
    isItHead: null,
    TotalBetCounter: 0,
    waitingForFlip: false,
    winAnimationStatus: false,
    networkId:0,
    investeds: {},
    investedsArray: [],
    card3StorageContract: null,
    warGameContract: null,
    etherProvider: null,
    totalChipsInAccount: 0,
    warGameGameCounter: 0,
    last10WarGame: [],
  },
  reducers: {
    setWarGameGameCounter: (state, action) => {
      state.warGameGameCounter = action.payload;
    },
    setAddress: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.address = action.payload
    },
    changeBalance: (state, action) => {
      state.balance = action.payload
    },
    changeBalanceNull: (state) => {
      state.balance = null
    },
    changeContractNull: (state) => {
      state.contract = null
    },
    changeContract: (state, action) => {
      state.contract = action.payload
    },
    addRecentGames: (state, action) => {
      state.recentGames = action.payload
    },
    addProvider: (state, action) => {
      state.provider = action.payload
    },
    setConnection: (state, action) => {
      state.isConnected = action.payload
    },
    setBetCounter: (state, action) => {
      state.totalBets = action.payload
    },
    setHeadOrTail: (state, action) => {
      state.isItHead = action.payload
    },
    setTotalBetCounter: (state, action) => {
      state.TotalBetCounter = action.payload
    },
    setWaitingForFlip: (state, action) => {
      state.waitingForFlip = action.payload
    },
    setWinAnationStatus: (state, action) => {
      state.winAnimationStatus = action.payload
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload
    },
    setInfoText: (state, action) => {
      state.infoText = action.payload
    },
    setCard3StorageContract: (state, action) => {
      state.card3StorageContract = action.payload
    },
    setWarGameContract: (state, action) => {
      state.warGameContract = action.payload
    },
    addEthersProvider: (state, action) => {
      state.etherProvider = action.payload
    },
    setTotalChips: (state, action) => {
      state.totalChipsInAccount = action.payload
    },
    setLast10WarGame: (state, action) => {
      // console.log(action.payload)
      // const _last10WarGame = [...state.last10WarGame];
      // state.last10WarGame = action.payload
      state.last10WarGame = action.payload
      // action.payload.forEach(game => {
      //   state.last10WarGame.push(game);
      // });
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAddress,changeBalance,changeBalanceNull,changeContractNull,changeContract,addRecentGames,addProvider,setConnection,setBetCounter,setHeadOrTail,setTotalBetCounter,setWaitingForFlip,setWinAnationStatus,setNetworkId,setInfoText,
  setCard3StorageContract,
  setWarGameContract,
  addEthersProvider,
  setTotalChips,
  setWarGameGameCounter,
  setLast10WarGame,
 } = web3AccountAdder.actions

export default web3AccountAdder.reducer