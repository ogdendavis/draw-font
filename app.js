'use strict';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: '',
      lorem: false,
      style: false,
      oldFontSize: false,
    }
    this.randomRange = this.randomRange.bind(this);
    this.randomBool = this.randomBool.bind(this);
    this.toggleLorem = this.toggleLorem.bind(this);
    this.pickFontFamily = this.pickFontFamily.bind(this);
    this.pickFontSize = this.pickFontSize.bind(this);
    this.convertFontSize = this.convertFontSize.bind(this);
    this.pickFontStyle = this.pickFontStyle.bind(this);
    this.pickFontWeight = this.pickFontWeight.bind(this);
    this.hexString = this.hexString.bind(this);
    this.pickTransform = this.pickTransform.bind(this);
    this.pickShadow = this.pickShadow.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.newLetter = this.newLetter.bind(this);
    this.newFont = this.newFont.bind(this);
  }

  componentDidMount() {
    // Generate random letter to use in drawing
    // Eventually, I want users to be able to go to a subdirectory of the top-
    // level domain to select which letter they want to be drawn
    // (so drawfont.com/j would draw a j).
    if (this.state.letter === '' && this.state.lorem === false) {
      this.newLetter();
    }
    if (this.state.style === false) {
      this.setStyle();
    }
  }

  componentDidUpdate() {
    // When the page updates, we need to check to make sure that the size of
    // the text is appropriate for the amount of text displayed.
    if (this.state.style !== false) {
      // When one letter displayed, we'll size in em. When a paragraph, we'll
      // size in px. Use that to check and switch.
      if (this.state.style.fontSize.includes('em') && this.state.lorem === false) {
        this.convertFontSize()
      }
      else if (this.state.style.fontSize.includes('px') && this.state.lorem === true) {
        this.convertFontSize()
      }
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

  randomBool(percent = 50) {
    // Returns a boolean. By default, there's an even chance that it will
    // return true or false. However, you can pass an integer between 0 and 100
    // that will represent the percent likelihood of the function returning true
    return Math.random() >= (percent / 100) ? false : true;
  }

  pickFontFamily() {
    // Pick a random generic font, with equal probability of each
    const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    const max = genericFamilies.length - 1;
    return genericFamilies[this.randomRange(0, max)];
  }

  pickFontSize() {
    // Pick a random font size between 10px and viewport height minus 20px.
    // This size is appropriate for a one-letter view, which is the default
    // when the page is loaded. If view is switched to paragraph,
    // convertFontSize will switch it to an appropriate height
    const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 20;
    return `${this.randomRange(10, maxHeight)}px`;
  }

  convertFontSize() {
    // Font size is in px when one letter is displayed, and in em when a
    // paragraph is displayed. We need to scale the size up or down when
    // switching between how much font is displayed in order to make the text
    // viewable. A relatively big px size should switch to a relatively big
    // em size, and vice-versa
    // Get current font size (as string including 'em' or 'px')
    const currentFontSize = this.state.style.fontSize;
    // If we've already converted it once (or more), just switch them back
    if (typeof this.state.oldFontSize === 'string') {
      const returnFontSize = this.state.oldFontSize;
      this.setState({
        style: {...this.state.style, fontSize: returnFontSize},
        oldFontSize: currentFontSize,
      });
      return;
    }
    // If we haven't already converted, perform the correct conversion, update
    // state.style with the new font size, and record the previous size in
    // state.oldFontSize so we can switch back if needed
    // Start with getting viewport size so we can convert it down to a
    // relatively scaled em size
    const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 20;
    const pxPerEm = maxHeight / 3;
    // Convert the font size string to a number
    const numericFontSize = Number(currentFontSize.slice(0,-2));
    // String to hold new size, calculated below
    let newFontSize = '';
    // If px, switch to em between 0 and 3 (set by pxPerEm above)
    if (currentFontSize.includes('px')) {
      newFontSize = `${Math.floor(numericFontSize / pxPerEm)}em`;
      // Check for 0 values, and fix
      if (newFontSize === '0em') {
        newFontSize = '0.5em';
      }
    }
    else {
      // If font size isn't in px, it must be in em so we need to convert it
      // back to px
      newFontSize = `${numericFontSize * pxPerEm}px`;
    }
    // Now that we have the new size, set the state, adding old font size
    this.setState({
      style: {... this.state.style, fontSize: newFontSize},
      oldFontSize: currentFontSize,
    });
  }

  pickFontStyle() {
    // Pick a random font style, with a 50% chance of normal
    if (this.randomBool()) {
      return 'normal'
    }
    // If my math is right, this else if and else together should mean that we
    // have an equal shot of getting italic or oblique as the style (50/50 at
    // this point, 25% each overall chance)
    else if (this.randomBool()) {
      return 'italic';
    }
    else {
      return `oblique ${this.randomRange(-20, 30)}deg`
    }
  }

  pickFontWeight() {
    // Pick a random font weight, from 1 to 1,000
    return this.randomRange(1, 1000);
  }

  pickLineHeight() {
    // Pick a random line height, from 0.5 to 3.5
    return this.randomRange(1, 7) / 2;
  }

  hexString(hex) {
    // This function MUST be passed an empty string when called!
    // It recursively selects a random value from the string of hex characters
    // until it has picked 6, to indicate a random hexadecimal color value
    hex += '0123456789abcdef'[this.randomRange(0, 15)];
    return hex.length === 6 ? hex : this.hexString(hex);
    // When using this return in CSS, you'll need to add the initial #
  }

  pickTransform() {
    // Returns a string to use in the text-transform CSS property.
    // There is a 30% chance that this function will return a transformation
    const transform = this.randomBool(30);
    if (transform) {
      return ['uppercase', 'lowercase', 'capitalize', 'full-width'][this.randomRange(0,3)]
    }
    else {
      return 'none';
    }
  }

  pickShadow() {
    // Returns a string to use in the text-shadow CSS property
    // There is a 30% chance that this function will return a shadow
    const shadow = this.randomBool(30);
    if (shadow) { // This block only executes if a shadow is to be returned
      // Both offset values and blur will be between 0px and 5px (inclusive)
      const hOff = this.randomRange(0,5);
      const vOff = this.randomRange(0,5);
      const blur = this.randomRange(0,5);

      // Default shadow color is a dark gray (almost black), but...
      let color = '#222';
      // ...there's a 30% chance that we'll pick a random hex color instead!
      const weirdColor = this.randomBool(30);
      if (weirdColor) {
        color = `#${this.hexString('')}`;
      }
      return `${hOff}px ${vOff}px ${blur}px ${color}`
    }
    else {
      return 'none';
    }
  }

  toggleLorem() {
    this.setState( { lorem: !this.state.lorem } );
  }

  setStyle() {
    // Setup to pick font color and adjust background, if needed
    const textColor = this.hexString('');
    const body = document.querySelector('body');
    // Remove reversed class from body -- won't throw an error if the class
    // isn't applied to the body, so safe to do without checking.
    body.classList.remove('bg--reversed');

    // Test if font color is light, and if so, re-apply the bg--reversed class
    const lightColorCutoff = 0xafffff;
    if (parseInt(textColor, 16) > lightColorCutoff) {
      body.classList.add('bg--reversed');
    }

    const style = {
      // Remember that you always need to pass an empty string to hexString,
      // and add the # before the returned value, which is just a random
      // six-digit hexadecimal number
      color: `#${textColor}`,
      fontFamily: this.pickFontFamily(),
      fontSize: this.pickFontSize(),
      fontStyle: this.pickFontStyle(),
      fontWeight: this.pickFontWeight(),
      lineHeight: this.pickLineHeight(),
      textTransform: this.pickTransform(),
      textShadow: this.pickShadow(),
    }
    // We're completely resetting the font style, so in addition to setting the
    // style we just made, we should get rid of the old font size
    this.setState( { style: style, oldFontSize: false } );
  }

  newLetter() {
    // Used on initial load, and when new font button is clicked
    const newLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.randomRange(0,51)];
    this.setState( { letter: newLetter } )
  }

  newFont() {
    if (this.state.lorem === false) {
      this.newLetter();
    }
    this.setStyle();
  }

  render() {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const content = this.state.lorem ? lorem : this.state.letter;
    const style = this.state.style === false ? {} : this.state.style;

    return (
      <div className = "container">
        <div className = "buttonContainer">
          <LoremButton loremOn = {this.state.lorem} toggle = {this.toggleLorem} />
          <button className = "newFontButton" onClick = {this.newFont}>
            New font
          </button>
        </div>
        <StyleDetail paraStyle = {style} />
        <p style = {style}>{content}</p>
      </div>
    );
  }
}

class LoremButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.loremOn ? 'View one letter' : 'View paragraph';
    return (
      <button className = 'loremButton' onClick = {this.props.toggle}>
        {content}
      </button>
    )
  }
}

class StyleDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // On first render, style object (paraStyle) will not be an object at all,
    // but instead it will be false. If that's the case, return early!
    if (this.props.paraStyle === false) {
      return null;
    }
    // Loop through the style object passed in as a prop, and create a table
    // row for each rule.
    const stylesListed = []
    for (let key in this.props.paraStyle) {
      stylesListed.push(
        <tr key={key}><td>{key}:</td><td>{this.props.paraStyle[key]}</td></tr>
      );
    }
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

ReactDOM.render(<Text />, document.querySelector('main'));
