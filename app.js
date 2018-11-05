'use strict';

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: '',
    }
    this.pickFontFamily = this.pickFontFamily.bind(this);
    this.pickFontSize = this.pickFontSize.bind(this);
    this.pickFontStyle = this.pickFontStyle.bind(this);
    this.pickFontWeight = this.pickFontWeight.bind(this);
    this.pickColor = this.pickColor.bind(this);
  }

  componentDidMount() {
    // Generate random letter to use in drawing
    // Eventually, I want users to be able to go to a subdirectory of the top-
    // level domain to select which letter they want to be drawn
    // (so drawfont.com/j would draw a j).
    if (this.state.letter === '') {
      const newLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 52)];
      this.setState( { letter: newLetter } )
    }
  }

  pickFontFamily() {
    const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    return genericFamilies[Math.floor(Math.random() * genericFamilies.length)];
  }

  pickFontSize() {
    const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const pickedHeight = Math.floor(Math.random() * (maxHeight - 20));
    return `${pickedHeight}px`;
  }

  pickFontStyle() {
    const styles = ['normal', 'italic', 'normal', 'oblique']
    const pickedStyle = styles[Math.floor(Math.random() * styles.length)];
    if (pickedStyle === 'oblique') {
      const degrees = Math.floor(Math.random() * 51) - 20; //range -20 to +30
      return `${pickedStyle} ${degrees}deg`;
    }
    return pickedStyle;
  }

  pickFontWeight() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  pickLineHeight() {
    return (Math.floor(Math.random() * 7) + 1) / 2;
  }

  pickColor(hex) {
    hex += '0123456789abcdef'[Math.floor(Math.random() * 16)];
    return hex.length === 6 ? hex : this.pickColor(hex);
  }

  render() {

    const style = {
      color: `#${this.pickColor('')}`,
      fontFamily: this.pickFontFamily(),
      fontSize: this.pickFontSize(),
      fontStyle: this.pickFontStyle(),
      fontWeight: this.pickFontWeight(),
      lineHeight: this.pickLineHeight(),
    }

    return (
      <p style = {style}>{this.state.letter}</p>
    );
  }
}

ReactDOM.render(<Letter />, document.querySelector('main'));
