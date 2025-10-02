import { useEffect, useState } from 'react'

export default function FunctionComponent(props){
    const [state, setState] = useState(({}))

    const componentDidMount = () => {
        console.log('componentDidMOunt')
        setState({number: 0})
    } 
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

    const handleIncClick = () => setState(prevState => ({...prevState, number: prevState.number+1}))

    useEffect(()=>{
        componentDidMount()
        return componentDidUnmount
    }, [])

    useEffect( ()=> {
        componentDidUpdate(props, state)
    }, [props,state])

    return(
        <div className="card">
            <p><button onClick={handleIncClick}>Increase Number</button></p>
            <p>number: {state.number}</p>
            <p><button onClick={handleLogClick}> Log props, state</button></p>
        </div>
    )
}