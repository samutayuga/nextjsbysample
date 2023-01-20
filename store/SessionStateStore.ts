import {create} from "zustand";

interface ISessionState{

}
interface ISessionActions{

}

const useSessionStoreBase = create<ISessionState & ISessionActions>((set) => ({

}))