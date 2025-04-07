/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'

export const If = ({ condition, children }) => {
  const elses = React.Children.toArray(children).filter(
    (element) => React.isValidElement(element) && element.type.name === 'Else'
  )

  const content = React.Children.toArray(children).filter(
    (element) => React.isValidElement(element) && element.type.name !== 'Else'
  )

  return condition ? content : elses
}

export class Else extends React.Component {
  static propTypes = {
    condition: PropTypes.any,
    children: PropTypes.any,
  }

  static defaultProps = {
    condition: true,
  }

  render() {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return this.props.condition ? this.props.children : <></>
  }
}

If.propTypes = {
  condition: PropTypes.any,
  children: PropTypes.any,
}
