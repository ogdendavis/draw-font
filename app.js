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
    // Generate random letter to use in drawing
    // Eventually, I want users to be able to go to a subdirectory of the top-
    // level domain to select which letter they want to be drawn
    // (so drawfont.com/j would draw a j).
    if (this.state.letter === '') {
      const newLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 52)];
      this.setState( { letter: newLetter } )
    }
  }

  randomRange(a, b) {
    // Returns a random whole integer between a and b (inclusive).
    // a and b must be whole integers.
    const max = a < b ? b : a;
    const min = max === b ? a : b;
    const diff = max - min;
    return Math.floor(Math.random() * (diff + 1)) + min;
  }

  pickFontFamily() {
    // Pick a random generic font, with equal probability of each
    const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    const max = genericFamilies.length - 1;
    return genericFamilies[this.randomRange(0, max)];
  }

  pickFontSize() {
    // Pick a random font size, from 10px to 20px less than the viewport height
    const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 20;
    return `${this.randomRange(10, maxHeight)}px`;
  }

  pickFontStyle() {
    // Pick a random font style, with a 50% chance of normal
    const styles = ['normal', 'italic', 'normal', 'oblique']
    const pickedStyle = styles[this.randomRange(0, styles.length - 1)];
    if (pickedStyle === 'oblique') {
      // If oblique is selected, pick a random degree of inclination, from
      // -20deg to 30deg
      return `${pickedStyle} ${this.randomRange(-20, 30)}deg`;
    }
    return pickedStyle;
  }

  pickFontWeight() {
    // Pick a random font weight, from 1 to 1,000
    return this.randomRange(1, 1000);
  }

  pickLineHeight() {
    // Pick a random line height, from 0.5 to 3.5
    return this.randomRange(1, 7) / 2;
  }

  pickColor(hex) {
    // This function MUST be passed an empty string when called!
    // It recursively selects a random value from the string of hex characters
    // until it has picked 6, to indicate a random hexadecimal color value
    hex += '0123456789abcdef'[this.randomRange(0, 15)];
    return hex.length === 6 ? hex : this.pickColor(hex);
    // When using this return in CSS, you'll need to add the initial #
  }

  pickTransform() {
    // Returns a string to use in the text-transform CSS property.
    // There is a 70% chance that this function will NOT return a transformation
    const transform = Math.random() >= 0.7 ? true : false;
    if (transform) {
      return ['uppercase', 'lowercase', 'capitalize', 'full-width'][this.randomRange(0,3)]
    }
    else {
      return 'none';
    }
  }

  pickShadow() {
    // Returns a string to use in the text-shadow CSS property
    // There is a 70% chance that this function will NOT return a shadow
    const shadow = Math.random() >= 0.7 ? true : false;
    if (shadow) { // This block only executes if a shadow is to be returned
      // Both offset values and blur will be between 0px and 5px (inclusive)
      const hOff = this.randomRange(0,5);
      const vOff = this.randomRange(0,5);
      const blur = this.randomRange(0,5);

      // Default shadow color is a dark gray (almost black), but...
      let color = '#222';
      // ...there's a 30% chance that we'll pick a random hex color instead!
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
      // Remember that you always need to pass an empty string to pickColor,
      // and add the # before the returned value, which is just a random
      // six-digit hexadecimal number
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
    // This function assumes that the paragraph styled by the Letter component
    // is the only paragraph on the page. If that's not the case, you'll need
    // to rewrite the querySelector to find the right paragrah
    const paragraph = document.querySelector('p');
    // Take the style of the paragraph, and first split it into an array with
    // each rule as its own object. Then take that array and map over it,
    // splitting it into an array of two strings: the first being the CSS
    // property being styled, and the second being the value for that property
    const styleArray = paragraph.getAttribute('style').split(';').map(rule => rule.split(':'));;
    // The construction of the array results in an empty first value -- get rid
    // of it!
    styleArray.pop();
    return styleArray;
  }

  render() {
    // Get an array of arrays representing the CSS rules on the paragraph
    const style = this.getStyle();
    // Map over the array to create table entries for each rule. The first item
    // in each array is the CSS property, and the second is the value
    const stylesListed = style.map(rulePair => {
      return (
        <tr key={rulePair[0]}><td>{rulePair[0]}:</td><td>{rulePair[1]}</td></tr>
      );
    });
    return (
      // Now draw the whole table, inserting the entries for each rule
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
