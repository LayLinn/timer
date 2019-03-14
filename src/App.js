import React, { Component } from 'react';
import Timer from './timer';
import './App.css';

class App extends Component{
    state = {
    seconds : 0,
    minutes : 0,
    hours : 0,
    isOn : false
    }

componentWillMount() {
    const timerStr = localStorage.getItem('timer');
    if(timerStr != null){
        const timer = JSON.parse(timerStr);
        this.setState({
            hours : timer.hours,
            minutes : timer.minutes,
            seconds : timer.seconds
        })
    }
}

componentDidMount() {
    this.interval = setInterval(() => {
    if(this.state.isOn){
        if(this.state.seconds===59){
            this.setState({minutes : this.state.minutes +1, seconds : 0})
        }
        if(this.state.minutes===59){
            this.setState({hours : this.state.hours +1, minutes : 0})
        } else{
            this.setState({seconds : this.state.seconds +1})
        }
    }
    },1000)

    window.addEventListener(
        'beforeunload',
        this.saveToLocalStorage.bind(this)
    );
}

componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener(
        'beforeunload',
        this.saveToLocalStorage.bind(this)
    );
}

handleClickToggle = () => {
    this.setState({isOn : !this.state.isOn})
}

handleClickReset = () => {
    this.setState({
        seconds : 0,
        minutes : 0,
        hours : 0,
        isOn : false
    });
};

saveToLocalStorage = () => {
    localStorage.setItem(
        "timer", 
        JSON.stringify({
            hours : this.state.hours,
            minutes : this.state.minutes,
            seconds : this.state.seconds
        })
    );
};

render(){
    return(
            <div>
                <Timer 
                hours={this.state.hours} 
                minutes={this.state.minutes} 
                seconds={this.state.seconds} 
                class="timer"/>
                <button onClick={this.handleClickToggle} class="btn btn-primary">Toggle</button>
                <button onClick={this.handleClickReset}>Reset</button>
            </div>
        )
    }
}

export default App;
