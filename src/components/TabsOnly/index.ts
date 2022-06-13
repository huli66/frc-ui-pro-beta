import { FC } from 'react'
import TabsOnly, { FRCTabsOnlyProps } from './TabsOnly'

export type FrcTabsOnlyCompoent = FC<FRCTabsOnlyProps> & {
}

const FrcTabs = TabsOnly as FrcTabsOnlyCompoent
export default FrcTabs
