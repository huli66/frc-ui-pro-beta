import Tooltip, {FRCTooltipProps} from './tooltip'
import TextTooltip from './textToolTip'

export type FRCTooltipComponent = React.FC<FRCTooltipProps> & {
    Text: typeof TextTooltip
}

const TransTooltip = Tooltip as FRCTooltipComponent

TransTooltip.Text = TextTooltip

export default TransTooltip
