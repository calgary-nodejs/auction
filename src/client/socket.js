import io from 'socket.io-client'
import { Observable } from 'rxjs'

const socket = io('http://localhost:8000')

export default socket
