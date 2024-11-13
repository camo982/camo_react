export const dispatchCustomEvent = ({ event, detail }) => {
  const eventAwesome = new CustomEvent(event, {
    bubbles: true,
    detail
  })
  window.dispatchEvent(eventAwesome)
}

export const showAlertMessage = ({ type, message, extraClass }) => {
  dispatchCustomEvent({
    event: 'showAlertMessage',
    detail: { type, message, extraClass }
  })
}

export default showAlertMessage