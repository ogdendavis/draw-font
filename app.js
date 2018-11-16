'use strict';

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: '',
    }
    this.randomRange = this.randomRange.bind(this);
    this.pickFontFamily = this.pickFontFamily.bind(this);
    this.pickFontSize = this.pickFontSize.bind(this);
    this.pickFontStyle = this.pickFontStyle.bind(this);
    this.pickFontWeight = this.pickFontWeight.bind(this);
    this.pickColor = this.pickColor.bind(this);
    this.pickTransform = this.pickTransform.bind(this);
    this.pickShadow = this.pickShadow.bind(this);
  }

  componentDidMount() {
    if (this.state.letter === '') {
      const newLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 52)];
      this.setState( { letter: newLetter } )
    }
  }

  randomRange(a, b) {
    const max = a < b ? b : a;
    const min = max === b ? a : b;
    const diff = max - min;
    return Math.floor(Math.random() * (diff + 1)) + min;
  }

  pickFontFamily() {
    const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    const max = genericFamilies.length - 1;
    return genericFamilies[this.randomRange(0, max)];
  }

  pickFontSize() {
    const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 20;
    return `${this.randomRange(10, maxHeight)}px`;
  }

  pickFontStyle() {
    const styles = ['normal', 'italic', 'normal', 'oblique']
    const pickedStyle = styles[this.randomRange(0, styles.length - 1)];
    if (pickedStyle === 'oblique') {
      return `${pickedStyle} ${this.randomRange(-20, 30)}deg`;
    }
    return pickedStyle;
  }

  pickFontWeight() {
    return this.randomRange(1, 1000);
  }

  pickLineHeight() {
    return this.randomRange(1, 7) / 2;
  }

  pickColor(hex) {
    hex += '0123456789abcdef'[this.randomRange(0, 15)];
    return hex.length === 6 ? hex : this.pickColor(hex);
  }

  pickTransform() {
    const transform = Math.random() >= 0.7 ? true : false;
    if (transform) {
      return ['uppercase', 'lowercase', 'capitalize', 'full-width'][this.randomRange(0,3)]
    }
    else {
      return 'none';
    }
  }

  pickShadow() {
    const shadow = Math.random() >= 0.7 ? true : false;
    if (shadow) {
      const hOff = this.randomRange(0,5);
      const vOff = this.randomRange(0,5);
      const blur = this.randomRange(0,5);

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
