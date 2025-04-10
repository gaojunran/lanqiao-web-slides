const fs = require('fs');
const path = require('path');

async function streamMergeRecursive(imgNameList, writeStream, deleFileList = []) {
    console.log(imgNameList, writeStream, deleFileList);

    for (const name of imgNameList) {
        await new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(path.resolve(baseDir, name));
            readStream.pipe(writeStream, { end: false });
            // 这个api没给，如果想实现异步(等待流传输完成)还不用这个api，只能手动sleep
            readStream.on('end', () => {
                deleFileList.push(name);
                resolve();
            });
            // readStream.on('error', reject);
        });
    }

    writeStream.end();

    await deleFile(imgNameList);
}
