# DrawFont!

## What is it?

DrawFont is a generator that randomly sets CSS rules for fonts, and displays a
single (random) letter of that font.

I think the cool thing about this is that it designates fonts only as generic
families, meaning that the actual result of the same CSS declarations will
display differently on different machines. For example, the "fantasy" font on
iOS in Safari looks very different from the "fantasy" font in Ubuntu on Firefox.

## But... why?

I was inspired by a design competition held by [AIGA Tallahassee](https://tallahassee.aiga.org/), in which
designers were randomly assigned a letter of the alphabet, and then asked to
draw up that single letter however they pleased in 45 minutes. It was basically
a tiny font competition. I got to thinking about how I would do something
similar as a developer, and decided to set myself a similar time limit to
implement a CSS font randomizer.

## What does it do?

After designing the basic randomization, I got to thinking about how I could
extend the project to be interesting or useful to developers, designers, and
people who are bored on the internet.

Note that I talk about "fonts" below, but what I really mean by that is the set
of CSS rules that were generated on any given page load.

- Current features:
  - Shows CSS declarations made to achieve font result

- Future features:
  - Option to display Lorem Ipsum text in generated font
  - Option to display Lorem Ipsum text in which each character is rendered in a
  different random font
  - Option to navigate to a subdirectory to control the text that is displayed
  when font is generated
  - Support for additional font families and/or additional CSS selectors
  - Show generic font families as they would appear on different operating
  systems and devices
