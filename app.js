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
    this.pickTransform = this.pickTransform.bind(this);
    this.pickShadow = this.pickShadow.bind(this);
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
    const pickedHeight = Math.floor(Math.random() * (maxHeight - 30)) + 10;
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

  pickTransform() {
    const transform = Math.random() >= 0.7 ? true : false;
    if (transform) {
      return ['uppercase', 'lowercase', 'capitalize', 'full-width'][Math.floor(Math.random() * 4)]
    }
    else {
      return 'none';
    }
  }

  pickShadow() {
    const shadow = Math.random() >= 0.7 ? true : false;
    if (shadow) {
      const hOff = Math.floor(Math.random() * 5);
      const vOff = Math.floor(Math.random() * 5);
      const blur = Math.floor(Math.random() * 5);

      let color = '#222';
      const weirdColor = Math.random() >= 0.7 ? true : false;
      if (weirdColor) {
        color = `#${this.pickColor('')}`;
      }
      return `${hOff}px ${vOff}px ${blur}px ${color}`
    }
    else {
      return 'none';
    }
  }

  render() {

    const style = {
      color: `#${this.pickColor('')}`,
      fontFamily: this.pickFontFamily(),
      fontSize: this.pickFontSize(),
      fontStyle: this.pickFontStyle(),
      fontWeight: this.pickFontWeight(),
      lineHeight: this.pickLineHeight(),
      textTransform: this.pickTransform(),
      textShadow: this.pickShadow(),
    }

    return (
      <p style = {style}>{this.state.letter}</p>
    );
  }
}

class StyleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.getStyle = this.getStyle.bind(this);
  }

  getStyle() {
    const paragraph = document.querySelector('p');
    const styleArray = paragraph.getAttribute('style').split(';').map(rule => rule.split(':'));;
    styleArray.pop();
    return styleArray;
  }

  render() {
    const style = this.getStyle();
    const stylesListed = style.map(rulePair => {
      return (
        <tr key={rulePair[0]}><td>{rulePair[0]}:</td><td>{rulePair[1]}</td></tr>
      );
    });
    return (
      <table className="styleDetail">
        <tbody>
          {stylesListed}
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(<Letter />, document.querySelector('main'));
ReactDOM.render(<StyleDetail />, document.querySelector('header'));
