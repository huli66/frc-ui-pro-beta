import { FC } from 'react'
import FRCCollapse, { FRCCollapseProps } from './collapse';
import FRCCollapsePanel from './CollapsePanel';

export type {FRCCollapseProps}
export type {FRCCollapsePanelProps} from './CollapsePanel'

export type FRCCollapseComponent = FC<FRCCollapseProps> & {
    Panel: typeof FRCCollapsePanel
}

export const TransCollapse = FRCCollapse as FRCCollapseComponent

TransCollapse.Panel = FRCCollapsePanel

export default TransCollapse
