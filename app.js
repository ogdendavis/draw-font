'use strict';

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: '',
    }
  }

  componentDidMount() {
    // Generate random letter to use in drawing
    // Eventually, I want users to be able to go to a subdirectory of the top-
    // level domain to select which letter they want to be drawn
    // (so drawfont.com/j would draw a j).
    if (this.state.letter === '') {
      const newLetter = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
      this.setState( { letter: newLetter } )
    }
  }

  render() {
    return (
      <p>{this.state.letter}</p>
    );
  }
}

ReactDOM.render(<Letter />, document.querySelector('main'));
