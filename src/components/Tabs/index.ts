import { FC } from 'react'
import Tabs, { FRCTabsProps } from './tabs'

export type FrcTabsCompoent = FC<FRCTabsProps> & {
}

const FrcTabs = Tabs as FrcTabsCompoent
export default FrcTabs
