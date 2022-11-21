import { ForwardRefExoticComponent, RefAttributes } from 'react'
import FRCInput, { FRCInputProps,InputRef } from './input'
import FRCSearch from './search'
import FRCGroup from './group'
import FRCTextArea from './textArea'
import FRCPassword from './password'
import FRCInputSelect from './inputSelect'

export type { FRCInputProps, InputRef } from './input'
export type { FRCSearchProps } from './search'
export type { FRCGroupProps } from './group'
export type { FRCTextAreaProps, TextAreaRef } from './textArea'
export type { FRCPasswordProps } from './password'
export type { FRCInputSelectProps } from './inputSelect'

export type FrcInputComponent = ForwardRefExoticComponent<FRCInputProps & RefAttributes<InputRef>> & {
  Search: typeof FRCSearch
  Group: typeof FRCGroup
  TextArea: typeof FRCTextArea
  Password: typeof FRCPassword
  InputSelect: typeof FRCInputSelect
}

const TransInput = FRCInput as FrcInputComponent

TransInput.Search = FRCSearch
TransInput.Group = FRCGroup
TransInput.TextArea = FRCTextArea
TransInput.Password = FRCPassword
TransInput.InputSelect = FRCInputSelect

export default TransInput
