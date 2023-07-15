/* eslint-disable no-unused-vars */

import { AppDispatch } from '../../store/store'
import { getNetworksList, setCurrentNetwork } from '../../store/web3/selectedNetwork'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const useAppDispatch = () => useDispatch<AppDispatch>()

const CommonProvider = () => {
    // handle network
    const dispatch = useAppDispatch()

    const { chainId } = useSelector((state: any) => state.wallet)
    const networksList = useSelector((state: any) => state.network.networksList)

    useEffect(() => {
        dispatch(getNetworksList())
    }, [])
    useEffect(() => {
        if (chainId && networksList && networksList.length) {
            let currentNetwork = networksList.find(
                (net) => net.chainId === chainId,
            )

            currentNetwork = currentNetwork ? currentNetwork : networksList[0]

            if (currentNetwork) {
                dispatch(setCurrentNetwork(currentNetwork))
            }
        }

    }, [networksList, chainId])

    return <></>
}

export default CommonProvider
