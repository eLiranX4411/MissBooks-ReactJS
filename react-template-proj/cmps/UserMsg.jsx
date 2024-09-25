import { eventBusService } from '../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  return (
    <section className='usermsg-container'>
      <h1>Welcome</h1>
    </section>
  )
}
