export default function DisplayWrapper(props) {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>{props.children}</div>
  )
}