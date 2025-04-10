/**
 * @description 待完成单词复习，跳到下一个单词
*/
function waitReview() {
  // TODO: 请补充代码
  // index == 10时回到1
  if (index == words.length) {
      index = 1
  } else {
      index++;
  }
  renderData(index)
}

/**
* @description 完成单词复习，删除当前单词，跳到下一个单词
*/
function completeReview() {
  // TODO: 请补充代码
  if (words.length >= 2) {
      words = words.filter((_, idx) => idx !== index - 1)
      // 0 1 2 3 4
      // index = 2
      //   ^
      // 0 2 3 4
      console.log(words);
      if (index == words.length + 1) {
          index = 1;
      }
      renderData(index)
      // TODO: END
      waitTaskBox.innerText = `还需复习：${words.length}`;
  } else {
      waitTaskBox.innerText = `还需复习：0`;
      document.querySelector("#word").innerHTML = `
      <p class="success">今日复习已完成</p>
      `
  }
  
}
