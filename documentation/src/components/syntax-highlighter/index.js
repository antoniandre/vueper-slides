const regexBasics = {
  quote: /("(?:\\"|[^"])*")|('(?:\\'|[^'])*')/, // Match simple and double quotes by pair.
  comment: /(\/\/.*|\/\*[\s\S]*?\*\/)/, // Comments blocks (/* ... */) or trailing comments (// ...).
  htmlTag: /(<([^>])*>)/,
  ponctuation: /(!==?|(?:[[\](){}.:;,+\-?=]|&lt;|&gt;)+|&&|\|\|)/, // Ponctuation not in html tag.
  number: /(-?(?:\.\d+|\d+(?:\.\d+)?))/,
  boolean: /\b(true|false)\b/
}

// The html tags names, attribute and inner special chars are treated inside the
// htmlTag regex above because javascript does not support lookbehind.
const dictionnary = {
  xml: {
    quote: regexBasics.quote,
    comment: /(&lt;!--[\s\S]*?--&gt;)/,
    tag: /(&lt;\/?)([a-zA-Z\-:]+)(.*?)(\/?&gt;)/
  },
  html: {
    quote: regexBasics.quote,
    comment: /(&lt;!--[\s\S]*?--&gt;)/,
    tag: /(&lt;\/?)([a-z]\w*)(.*?)(\/?&gt;)/
  },
  'html-vue': {
    quote: regexBasics.quote,
    comment: /(&lt;!--[\s\S]*?--&gt;)/,
    tag: /(&lt;\/?)([a-z][a-z_-]*)((?:.|\s)*?)(\/?&gt;)/
  },
  css: {
    quote: regexBasics.quote,
    comment: /(\/\*[\s\S]*?\*\/)/,
    pseudo: /(:(?:hover|active|focus|visited|before|after|(?:first|last|nth)-child))/,
    'selector keyword vendor': /(@-(?:moz|o|webkit|ms)-(?=keyframes\s))/,
    'selector keyword': /((?:@(?:import|media|font-face|keyframes)|screen|print|and)(?=[\s({])|keyframes|\s(?:ul|ol|li|table|div|pre|p|a|img|br|hr|h[1-6]|em|strong|span|html|body|iframe|video|audio|input|button|form|label|fieldset|small|abbr|i|dd|dt)\b)/,
    selector: /((?:[.#-\w\*+ >:,~\n]|&gt;)+)(?=\s*\{)/, // Any part before '{'.
    'attribute keyword vendor': /(-(?:moz|o|webkit|ms)-(?=transform|transition|user-select|animation|background-size|box-shadow))/,
    'attribute keyword': /\b(content|float|display|position|top|left|right|bottom|(?:(?:max|min)-)?width|(?:(?:max|min|line)-)?height|font(?:-(?:family|style|size|weight|variant|stretch))?|vertical-align|color|opacity|visibility|z-index|transform(?:-(?:origin|style|delay|duration|property|timing-function))?|transition(?:-(?:delay|duration))?|animation(?:-(?:name|delay|duration|direction|fill-mode))?|background(?:-(?:color|position|image|repeat|size))?|(?:padding|margin|border)(?:-(?:top|left|right|bottom))?|border(?:-radius)|white-space|text-(?:align|transform|decoration|shadow|indent)|overflow(?:-(?:x|y))?|letter-spacing|box-(?:sizing|shadow)|stroke(?:-(?:width|opacity|dasharray|dashoffset|linecap|linejoin))?|fill|speak|outline|user-select|cursor)(?=\s*:)/,
    'value keyword vendor': /(-(?:moz|o|webkit|ms)-(?=linear-gradient))/,
    'value keyword': /\b(inline-block|inline|block|absolute|relative|static|fixed|inherit|initial|none|auto|hidden|visible|top|left|right|bottom|center|middle|baseline|pre|wrap|nowrap|(?:upper|lower)case|capitalize|linear(?:-gradient)?|ease(?:-in)?(?:-out)?|all|infinite|cubic-bezier|(?:translate|rotate)(?:[X-Z]|3d)?|skew[XY]?|scale|(?:no-)?repeat|repeat(?:-x|-y)|contain|cover|!important|url|inset|pointer|flex)(?=\s*[,;}(]|\s+[\da-z])/,
    number: regexBasics.number,
    color: /(transparent|#(?:[\da-fA-F]{6}|[\da-fA-F]{3})|rgba?\([\d., ]*\))/,
    // ponctuation: /([:,;{}@#()]+)/,// @todo Why can't use this one if text contains '<' or '>' ??
    htmlentity: /(&.*?;)/,
    ponctuation: /([:,;{}@#()]+|&lt;|&gt;)/,
    attribute: /([a-zA-Z-]+)(?=\s*:)/,
    unit: /(px|pt|%|r?em|m?s|deg|vh|vw|vmin|vmax)(?=(?:\s*[;,{}}\)]|\s+[\-\da-z#]))/
  },
  json: {
    quote: regexBasics.quote,
    comment: regexBasics.comment,
    number: regexBasics.number,
    boolean: regexBasics.boolean,
    ponctuation: /([[\](){}:;,-]+)/// Override default to simplify.
  },
  js: {
    quote: regexBasics.quote,
    comment: regexBasics.comment,
    number: /\b(\d+(?:\.\d+)?|null)\b/,
    boolean: regexBasics.boolean,
    keyword: /\b(new|getElementsBy(?:Tag|Class|)Name|getElementById|arguments|if|else|do|return|case|default|function|typeof|undefined|instanceof|this|document|window|while|for|switch|in|break|continue|length|var|(?:clear|set)(?:Timeout|Interval)|Math(?=\.)|Date)(?=\W)/,
    ponctuation: /(!==?|(?:[[\](){}:;,+\-%*/?=]|&lt;|&gt;)+|\.+(?![a-zA-Z])|&amp;&amp;|\|\|)/, // Override default since '.' can be part of js variable.
    variable: /(\.?[a-zA-Z]\w*)/,
    htmlentity: /(&.*?;)/,
    dollar: /(\$|jQuery)(?=\W|$)/// jQuery or $.
  },
  php: {
    quote: regexBasics.quote,
    comment: regexBasics.comment,
    ponctuation: regexBasics.ponctuation,
    number: regexBasics.number,
    boolean: regexBasics.boolean,
    keyword: /\b(define|echo|die|print_r|var_dump|if|else|do|return|case|default|function|\$this|while|for|switch|in|break|continue)(?=\W|$)/,
    variable: /(?:(?=\W))(\$\w+)/
  },
  sql: {
    quote: regexBasics.quote,
    comment: regexBasics.comment,
    ponctuation: regexBasics.ponctuation,
    number: /\b(\d+(?:\.\d+)?|null)\b/,
    boolean: regexBasics.boolean,
    keyword: /\b(\*|CREATE|ALL|DATABASE|TABLE|GRANT|PRIVILEGES|IDENTIFIED|FLUSH|SELECT|UPDATE|DELETE|INSERT|FROM|WHERE|(?:ORDER|GROUP) BY|LIMIT|(?:(?:LEFT|RIGHT|INNER|OUTER) |)JOIN|AS|ON|COUNT|CASE|TO|IF|WHEN|BETWEEN|AND|OR|CONCAT)(?=\W|$)/
  }
}

const attributesRegex = {
  xml: /(\s*)([a-zA-Z\-:]+)=("|')(.*?)\3/g,
  html: /(\s*)([a-zA-Z\-]+)=("|')(.*?)\3/g,
  'html-vue': /(\s*)(:?[a-zA-Z\-]+)(?:(?:=("|')(.*?)\3)|)/g
}


export const precode = {
  name: 'precode',
  template: '<pre v-html="content" :data-type="language"></pre>',
  props: {
    language: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    knownLanguages: ['html', 'html-vue', 'css', 'js', 'json', 'php', 'sql'],
    content: ''
  }),
  methods: {
    htmlize (string) {
      return string.replace(/&(lt|gt|amp);/g, function (m0, m1) { return { lt: '<', gt: '>', amp: '&' }[m1] })
    },
    unhtmlize (string) {
      return string.replace(/[<>]/g, function (m) { return { '<': '&lt;', '>': '&gt;' }[m] })
    },
    isColorDark (colorString) {
      let rgbColor, hexColor, rDark, gDark, bDark

      if ((rgbColor = colorString.match(/rgba?\((.*),\s*(.*),\s*(.*)[^)]*\)/))) {
        rDark = parseInt(rgbColor[1]) <= 100
        gDark = parseInt(rgbColor[2]) <= 100
        bDark = parseInt(rgbColor[3]) <= 100
      } else if ((hexColor = colorString.match(/#([\da-f]{3}(?:[\da-f]{3})?)/))) {
        let has3chars = hexColor[1].length === 3
        rDark = parseInt(hexColor[1][0]) <= 9
        gDark = parseInt(hexColor[1][has3chars ? 1 : 2]) <= 9
        bDark = parseInt(hexColor[1][has3chars ? 2 : 4]) <= 9
      }

      // #00f blue is also a dark color...
      return (rDark && gDark && bDark) || (rDark && gDark && !bDark) || (!rDark && gDark && bDark)
    },
    // Create a single regex pattern from assembling the regex pieces of the selected language.
    // This regex pattern will be used all at once for the string replacement.
    createRegexPattern (string) {
      let pattern = ''
      let classMap = []

      for (let Class in dictionnary[this.language]) {
        classMap.push(Class)

        if (Class === 'quote') {
          // Add twice because 2 captures are made in the quote regexp.
          classMap.push(Class)
        }

        if (['xml', 'html', 'html-vue'].indexOf(this.language) > -1 && Class === 'tag') {
          classMap.push(Class, Class, Class)
        }

        pattern += (pattern ? '|' : '') + dictionnary[this.language][Class].source
      }

      return [pattern, classMap]
    },
    syntaxHighlightHtmlTag (dictionnaryMatches) {
      let tagPieces = dictionnaryMatches.slice(3)

      // Converts every html attribute with syntax highlighting, e.g:
      // ` class="my-class"` => ` <span class="attribute">class</span><span class="ponctuation">=</span><span class="quote">"my-class"</span>`,
      // ` checked` => ` <span class="attribute">checked</span><span class="ponctuation">=</span><span class="quote">"my-class"</span>`.
      let renderAttributesList = function () {
        return (
          // `attribute-name`
          `${arguments[1]}<span class="attribute">${arguments[2]}</span>` +
          // `=`
          (arguments[4] ? `<span class="ponctuation">=</span>` : '') +
          // `"attribute value"`
          (arguments[4] ? `<span class="quote">${arguments[3] || ''}${arguments[4] || ''}${arguments[3] || ''}</span>` : '')
        )
      }
      let attributesList = (tagPieces[2] || '').replace(attributesRegex[this.language], renderAttributesList)

      // Considering these 3 possible captures of html tags:
      // `<tag-name attrs>` or `<tag-name attrs />` or `</tag-name>`,
      return (
        // Will be the tag opening: `</` or `<`.
        `<span class="ponctuation">${tagPieces[0]}</span>` + 
        // Will be the tag-name + attributes list if any.
        `<span class="tag-name">${tagPieces[1]}</span>` + attributesList +  
        // Will be the tag end `>` or `/>`.
        `<span class="ponctuation">${tagPieces[3]}</span>` 
      )
    },
    syntaxHighlightContent (string) {
      // Only proceed if the language is supported.
      if (this.knownLanguages.indexOf(this.language) > -1) {
        let [regexPattern, classMap] = this.createRegexPattern()

        string = this.unhtmlize(string).replace(new RegExp(regexPattern, 'g'), (...args) => {
          let match, Class

          // "arguments.length - 2" because the function is called with arguments like so:
          // function(strMatch, c1, c2, ..., cn, matchOffset, sourceString){}. With c = the captures.
          let dictionnaryMatches = Array.prototype.slice.call(args, 1, args.length - 2)
          for (let i = 0; i < dictionnaryMatches.length; i++) {
            if (dictionnaryMatches[i]) {
              match = dictionnaryMatches[i]
              Class = classMap[i]
              break
            }
          }

          if (Class === 'quote') match = this.unhtmlize(args[1] || args[2])
          if (Class === 'comment') match = this.unhtmlize(match)
          if (Class === 'tag' && ['xml', 'html', 'html-vue'].indexOf(this.language) > -1) {
            return this.syntaxHighlightHtmlTag(dictionnaryMatches)
          }

          if (Class === 'variable' && match[0] === '.' && this.language === 'js') {
            /**
              * @todo don't apply variable color if char before '.' is not '\w'.
              */
            return `<span class="ponctuation">.</span><span class="objAttr">${match.substr(1)}</span>`
          }
          
          let styles = ''
          if (Class === 'color' && this.language === 'css') {
            styles = ` style="background-color: ${match};color: #${this.isColorDark(match) ? 'fff' : '000'}"`
          }

          return `<span class="${Class}"${styles}>${match}</span>`
        })
      }

      return string
    }
  },
  created () {
    this.$slots.default.forEach(pieceOfCode => {
      if (pieceOfCode.text) {
        // console.log(pieceOfCode)
        this.content += pieceOfCode.text
      }
    })
    this.content = this.syntaxHighlightContent(this.content)
  }
}
