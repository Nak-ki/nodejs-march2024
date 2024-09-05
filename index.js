const fsPromise = require('node:fs/promises')
const path = require('node:path')

const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']

const createFolder = async () => {
    for (const folder of folders) {
        const pathToFolder = path.join(__dirname, 'mainFolder', folder)
        await fsPromise.mkdir(pathToFolder, { recursive: true })
        for (const file of files) {
            await fsPromise.writeFile(path.join(pathToFolder, file ), file)
        }
    }
    readFile()
}
const readFile = async () => {
    for (const folder of folders) {
        for (const file of files) {
            const pathToFolder = path.join(__dirname, 'mainFolder', folder, file)
            const info = await fsPromise.readFile(pathToFolder, { encoding: 'utf8' })
            console.log(info)
        }
    }
    statInfo()
}

const statInfo = async () => {
    const result = await  fsPromise.readdir(path.join(__dirname, 'mainFolder'))
    console.log(result)
    for (const folder of result) {
       const pathToFolder = path.join(__dirname, 'mainFolder', folder)
       const stat = await fsPromise.stat(pathToFolder)
        console.log(folder, stat.isDirectory())
        const result2 = await  fsPromise.readdir(path.join(__dirname, 'mainFolder', folder))
        for (const file of result2) {
            const pathToFile = path.join(__dirname, 'mainFolder', folder, file)
            const stat = await fsPromise.stat(pathToFile)
            console.log(file, stat.isDirectory())
        }
    }
}

createFolder()