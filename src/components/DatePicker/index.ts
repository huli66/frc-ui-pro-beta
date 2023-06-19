import { ForwardRefExoticComponent, RefAttributes } from 'react'
import FRCDatePicker, { FRCDatePickerProps } from './datePicker'
import FRCRangePicker, { FRCRangePickerProps } from './rangePicker'
import { PickerRef } from './interface'

export type { FRCDatePickerProps, PickerRef }
export type { FRCRangePickerProps }

export type FRCDatePickerComponent = ForwardRefExoticComponent<FRCDatePickerProps & RefAttributes<PickerRef>> & {
    RangePicker: ForwardRefExoticComponent<
        FRCRangePickerProps & RefAttributes<PickerRef>
    >;
}

const TransDatePicker = FRCDatePicker as FRCDatePickerComponent
TransDatePicker.RangePicker = FRCRangePicker

export default TransDatePicker
