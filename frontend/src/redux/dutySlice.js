import { createSlice } from "@reduxjs/toolkit";

const dutySlice = createSlice({
    ame:"duty",
    initialState: {
        allDuties:[],
        allAdminDuties:[],
        singleDuty:null,
        searchDutyByText: "",
        allAppliedDuties: [],
        searchedQuery: "",
    },
    reducers: {
        setAllDuties(state, action) {
            state.allDuties = action.payload;
        },
        setAllAdminDuties(state, action) {
            state.allAdminDuties = action.payload;
        },
        setSingleDuty(state, action) {
            state.singleDuty = action.payload;
        },
        setSearchDutyByText(state, action) {
            state.searchDutyByText = action.payload;
        },
        setAllAppliedDuties(state, action) {
            state.allAppliedDuties = action.payload;
        },
        setSearchedQuery(state, action) {
            state.searchedQuery = action.payload;
        }
    }
});
export const { 
    setAllDuties, 
    setAllAdminDuties, 
    setSingleDuty, 
    setSearchDutyByText, 
    setAllAppliedDuties,
    setSearchedQuery
} = dutySlice.actions;
export default dutySlice.reducer;