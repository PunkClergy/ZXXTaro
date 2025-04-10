import Taro from '@tarojs/taro'
export const TurnImageToBase64 = (filePath) => {
    if (process.env.TARO_ENV === 'h5') {
        return filePath
    }

    return new Promise((resolve, reject) => {
        Taro.getFileSystemManager().readFile({
            filePath,
            encoding: 'base64',
            success: (res) => resolve(`data:image/${filePath.slice(-3)};base64,${res.data}`),
            fail: (err) => reject(err)
        })
    })
}