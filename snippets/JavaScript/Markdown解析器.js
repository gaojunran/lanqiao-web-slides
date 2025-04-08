const START = 1
const MIDDLE = 2
const END = 3
const BLOCKQUOTE = 1
const UL = 2

class Parser {
  constructor() {
    this.heading = /^(#{1,6}\s+)/;
    this.blockQuote = /^(\>\s+(.*))/;
    this.unorderedList = /^((\*|-){1}\s+(.*))/;
    this.image = /\!\[(.*?)\]\((.*?)\)/g;
    this.strongText = /\*{2}(.*?)\*{2}/g;
    this.codeLine = /\`{1}(.*?)\`{1}/g;
    // TODO: 补充分割符正则
    this.hr = /\-{3}\-*/;
  }
  
  // 获取单行内容
  parseLineText(lineText) {
    this.lineText = lineText;
  }

  // 是否是空行
  isEmptyLine() {
    return this.lineText === "";
  }

  // 是否为符合标题规范
  isHeading() {
    return this.heading.test(this.lineText);
  }

  // 解析标题
  parseHeading() {
    const temp = this.lineText.split(" ");
    const headingLevel = temp[0].length;
    const title = temp[1].trim();
    return `<h${headingLevel}>${title}</h${headingLevel}>`;
  }

  /**
   * TODO: 请完成剩余各种语法的解析
   *   1. 完成对分隔符的解析
   *   2. 完成对引用区块的解析
   *   3. 完成对图片，和文字效果的解析
   *   4. 完成对无序列表的解析
   */
  isHr() {
    return this.hr.test(this.lineText);
  }

  parseHr() {
    return `<hr>`
  }

  isBlockQuote() {
    return this.blockQuote.test(this.lineText);
  }

  parseBlockQuote(position) {
    const match = this.blockQuote.exec(this.lineText);
    if (position == START) {
      return `<blockquote><p>${match[2]}</p>`
    } else if (position == MIDDLE) {
      return `<p>${match[2]}</p>`
    } else {
      return `</blockquote>`
    }
  }
  isUl() {
    return this.unorderedList.test(this.lineText);
  }
  parseUl(position) {
    const match = this.unorderedList.exec(this.lineText);
    if (position == START) {
      return `<ul><li>${match[3]}</li>`
    } else if (position == MIDDLE) {
      return `<li>${match[3]}</li>`
    } else {
      return `</ul>`
    }
  }
  // isImg() {
  //   return this.image.test(this.lineText)
  // }
  // parseImg() {
  //   const match = this.image.exec(this.lineText)
  //   // console.log(match);
  //   return `<img src="${match[2]}" alt="${match[1]}">`
  // }
  // isStrong() {
  //   return this.strongText.test(this.lineText)
  // }
  // parseStrong() {
  //   const match = this.strongText.exec(this.lineText);
  //   return `<b>${match[1]}</b>`
  // }
  // isCode() {
  //   return this.codeLine.test(this.lineText);
  // }
  // parseCode() {
  //   const match = this.codeLine.exec(this.lineText);
  //   return `<code>${match[1]}</code>`
  // }
}



class Reader {
  constructor(text) {
    //获取全部原始文本
    this.text = text;
    this.lines = this.getLines();
    this.parser = new Parser();
  }

  runParser() {
    let currentLine = 0;
    let hasParsed = [];
    let last = undefined;

    while (!this.reachToEndLine(currentLine)) {
      // 获取行文本
      this.parser.parseLineText(this.getLineText(currentLine));

      // 判断空白行
      if (this.parser.isEmptyLine()) {
        // TODO: 解决引用区块的结束
        if (last == BLOCKQUOTE) {
          hasParsed.push(this.parser.parseBlockQuote(END));
          last = undefined;
        }
        if (last == UL) {
          hasParsed.push(this.parser.parseUl(END));
          last = undefined;
        }
        currentLine++;
        continue;
      }

      if (this.parser.isHeading()) {
        hasParsed.push(this.parser.parseHeading());
        currentLine++;
        continue;
      }
      // TODO: 请完成剩余各种语法的解析
      if (this.parser.isHr()) {
        hasParsed.push(this.parser.parseHr());
        currentLine++;
        continue;
      }

      if (this.parser.isBlockQuote()) {
        if (last == BLOCKQUOTE) {
          hasParsed.push(this.parser.parseBlockQuote(MIDDLE))
        } else {
          hasParsed.push(this.parser.parseBlockQuote(START))
        }
        last = BLOCKQUOTE;
        currentLine++
        continue;
      }

      if (this.parser.isUl()) {
        if (last == UL) {
          hasParsed.push(this.parser.parseUl(MIDDLE))
        } else {
          hasParsed.push(this.parser.parseUl(START))
        }
        last = UL;
        currentLine++
        continue;
      }

      // if (this.parser.isImg()) {
      //   hasParsed.push(this.parser.parseImg());
      //   currentLine++
      //   continue;
      // }

      hasParsed.push(this.parser.lineText
                  .replace(this.parser.image, "<img src=\"$2\" alt=\"$1\">")
                  .replace(this.parser.strongText, "<b>$1</b>")
                  .replace(this.parser.codeLine, "<code>$1</code>")
      );
      currentLine++;
    }
    console.log(hasParsed);
    return hasParsed.join("");
  }

  getLineText(lineNum) {
    return this.lines[lineNum];
  }

  getLines() {
    this.lines = this.text.split("\n");
    return this.lines;
  }

  reachToEndLine(line) {
    return line >= this.lines.length;
  }
}

module.exports = function parseMarkdown(markdownContent) {
  return new Reader(markdownContent).runParser();
};
