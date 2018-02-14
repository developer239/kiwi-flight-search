import { branch, renderComponent, withProps } from 'recompose'
import { NoData } from 'components'


const withCustomMessageProp = message => withProps(() => ({ message }))

const withNoData = isNoData => message =>
  branch(
    isNoData,
    renderComponent(withCustomMessageProp(message)(NoData)),
  )

export default withNoData
