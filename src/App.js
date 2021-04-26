import React, { Component } from 'react'
import './App.css'

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { entries: [], output: '', computed: false}
    this.handelClick = this.handelClick.bind(this)
  }
  
  handelClick(event) {
    event.preventDefault()
    const value = event.target.value
    let output = ''
    switch(value){
      case 'clear':
        this.setState({
          entries: []
        })
        break
      case '=':
        output = this.calculate(this.state.entries)
        if (this.valideExpression(this.state.entries)) {
          this.setState({
            entries: [output.toString()],
            computed: true
          })
        } else {
          if (output === Infinity || output === -Infinity) {
            output = null
             this.setState({
                entries: [],
                computed: true
              }) 
          }
        }
        break
      default:
        this.setState({
          entries: this.addCharacter(this.state.entries, value, this.state.computed),
          computed: false
        })
        output = this.state.entries.join(' ')
    }
    this.setState({ output })
  }
  
  valideExpression(entries) {
    if(['+', '*', '-', '/'].indexOf(entries[entries.lenght -1]) > -1 || entries.length === 0)
      return false
    if (entries.length > 1 && entries[entries.length -1] === '0' && entries[entries.length -2] === '/')
      return false
    if (entries.length > 2 && entries[entries.length -1] === '0' && entries[entries.length -2] === '-' && entries[entries.length -3] === '/') 
      return false
    if (isNaN(entries[entries.length - 1]))
      return false
    return true
  }
  
  addCharacter(current, value, computed) {
    if (current.length === 0 && ['+', '*', '=', '/'].indexOf(value) > -1) {
      return current
    }
    if (!isNaN(parseInt(value))) {
      if (computed && current.length === 1){
        console.log(current)
        current[current.length -1] = value
      }
      else if(current.length > 0 && !isNaN(parseInt(current[current.length -1]))) {
         if (current[current.length -1] === '0')
           current[current.length -1] = value
         else
           current[current.length -1] = current[current.length -1] + value
      } else {
        current.push(value)
      }
    } else if (current.length > 0 && ['+', '-'].indexOf(current[current.length -1]) > -1 ) {
      if (['+', '*', '-', '/'].indexOf(value) > -1 && current.length > 1)
        current[current.length -1] = value
      else if (['+', '*', '/'].indexOf(value) > -1 && current.length === 1)
        current.pop()
    } else if (current.length > 0 && ['*', '/'].indexOf(current[current.length -1]) > -1 ) {
      if (['+', '*', '/'].indexOf(value) > -1)
        current[current.length -1] = value
      else if (value === '-') {
        current.push(value)
      }
    } else {
      current.push(value)
    }
    return current
  }
  
  calculate(entries) {
    console.log(entries[0])
    if (entries[0] === '-' && entries.length > 1) {
      entries.unshift('0')
    }
    if (entries.length === 0)
      return ''
    if (entries[0] === '-' && entries.length === 1) {
      return '-'
    }
    return this.evaluate(entries)
  }
  
  evaluate(expression) {
    let current = null
    let right = null
    for(let i = 0; i < expression.length; i++){
      if (isNaN(parseInt(expression[i]))) {
          if (!isNaN(parseInt(expression[i-1])) && !isNaN(parseInt(expression[i+1]))) {
            right = parseInt(expression[i+1])
          } else if (isNaN(parseInt(expression[i+1])) && expression[i+1] === '-') {
            right = (-1) * parseInt(expression[i+2])
          }
            if (!current) {
              switch (expression[i]) {
                case '+':
                  current = parseInt(expression[i-1]) + right
                  break
                case '-':
                  current = parseInt(expression[i-1]) - right
                  break
                case '*':
                  current = parseInt(expression[i-1]) * right
                  break
                case '/':
                  current = Math.floor(parseInt(expression[i-1]) / right)
              }
            } else {
              switch (expression[i]) {
                case '+':
                  current = current + right
                  break
                case '-':
                  current = current - right
                  break
                case '*':
                  current = current * right
                  break
                case '/':
                  current = Math.floor(current / right)
              }
            }
       }
      if (isNaN(parseInt(expression[i])) && expression[i+1] === '-')
        i = i +1
    }
    return current
    
  }

  
 
  render() {
    return (
      <div className="calculator">
        <div className="output output-content">
          {this.state.output}
        </div>
        <div className="keyboard">
          <table>
            <tbody>
              <tr>
              </tr>
              <tr>
                <td><button className="digit-1" onClick={this.handelClick} value="1">1</button></td>
                <td><button className="digit-2" onClick={this.handelClick} value="2">2</button></td>
                <td><button className="digit-3" onClick={this.handelClick} value="3">3</button></td>
                <td><button className="digit-4" onClick={this.handelClick} value="4">4</button></td>
              </tr>
              <tr>
                <td><button className="digit-5" onClick={this.handelClick} value="5">5</button></td>
                <td><button className="digit-6" onClick={this.handelClick} value="6">6</button></td>
                <td><button className="digit-7" onClick={this.handelClick} value="7">7</button></td>
                <td><button className="digit-8" onClick={this.handelClick} value="8">8</button></td>
              </tr>
              <tr>
                <td><button className="digit-9" onClick={this.handelClick} value="9">9</button></td>
                <td><button className="digit-0" onClick={this.handelClick} value="0">0</button></td>
                <td><button className="op-add" onClick={this.handelClick} value="+">+</button></td>
                <td><button className="op-sub" onClick={this.handelClick} value="-">-</button></td>
              </tr>
              <tr>
                <td><button className="op-mul" onClick={this.handelClick} value="*">*</button></td>
                <td><button className="op-div" onClick={this.handelClick} value="/">/</button></td>
                <td><button className="eq" onClick={this.handelClick} value="=">=</button></td>
                <td><button className="clear" onClick={this.handelClick} value="clear">C</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}