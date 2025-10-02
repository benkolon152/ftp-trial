import { useState } from 'react'

export default function FunctionComponent(props){
    const [state, setState] = useState(({}))

    const componentDidMount = () => console.log('componentDidMOunt') 
    const componentDidUnmount = () => console.log('componentDidUnmount')
    const componentDidUpdate = (prevProps, prevState) => {
        console.log('componentDidUpdate props', prevProps, props)
        console.log('componentDidUpdate state', prevState, state)
    }  

    const handleLogClick = () =>{
        const {fruit, callback, children} = props
        callback('handleLogClick call')

        try{
            console.log('handleLogclick', props)
            console.log('handleLogclick', state)
        }catch(e){
            console.warn(e)
        }
    }
    return(
        <div className="card">
            <p><button>Increase Number</button></p>
            <p>number: {0}</p>
            <p><button onClick={handleLogClick}> Log props, state</button></p>
        </div>
    )
}