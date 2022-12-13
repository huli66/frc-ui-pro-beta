import { FC } from 'react'
import FRCTimeline, { FRCTimelineProps } from './timeline';
import FRCTimelineItem from './TimelineItem';

export type {FRCTimelineProps}
export type {FRCTimeLineItemProps} from './TimelineItem'

export type FRCTimelineComponent = FC<FRCTimelineProps> & {
    Item: typeof FRCTimelineItem
}

export const TransTimeline = FRCTimeline as FRCTimelineComponent

TransTimeline.Item = FRCTimelineItem

export default TransTimeline
