/**
 * 2024年国赛。签到题。
 */

if (isPre) {
    if (thisIndex == 0) {
      thisIndex = 3
    } else {
      thisIndex -= 1
    }
  } else {
    if (thisIndex == 3) {
      thisIndex = 0
    } else {
      thisIndex += 1
    }
  }