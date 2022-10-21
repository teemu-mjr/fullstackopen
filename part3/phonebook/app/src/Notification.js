const Notification = ({message, style}) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="message" style={style}>
      {message}
    </div>
  )
}

export default Notification;
