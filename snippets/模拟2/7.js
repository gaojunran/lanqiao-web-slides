const fetchMeetingData = async () => {
  // TODO: 待补充代码
  const res = await fetch("./js/meetings.json");
  const json = await res.json();
  participants.value = json["participants"];
  delete json["participants"];
  meeting.value = json;
  console.log(participants.value);
  console.log(meeting.value);
};

const formatDate = (dateStr) => {
  // TODO: 待补充代码
  if (dateStr) {
    let [year, month, date] = dateStr.split("-")
    month = month.padStart(2, "0")
    date = date.padStart(2, "0")
    return year + "-" + month + "-" + date
  }
};

onMounted(async () => {
  // 获取会议数据
  await fetchMeetingData();

  // 模拟参与者加入会议
  await simulateParticipantJoin();
});

function myAllSettled(promises) {
  // TODO: 待补充代码
  // 不能使用 Promise.allSettled, Promise.all，Promise.race 等方法
  return new Promise((resolve, reject) => {
    const results = []
    promises.forEach((p, idx) => {
      Promise.resolve(p).then((res) => {
        results[idx] = res
        if (Object.keys(results).length == promises.length) {
          resolve(results)
        }
      }, (rej) => {
        results[idx] = rej
        if (Object.keys(results).length == promises.length) {
          resolve(results)
        }
      })
    })
  });
}
