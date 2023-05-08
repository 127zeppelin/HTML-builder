const pathsToCheck = ['./txtDir', './txtDir/file.txt'];

for (let i = 0; i < pathsToCheck.length; i++) {
    stat(pathsToCheck[i], (err, stats) => {
        console.log(stats.isDirectory());
        console.log(stats);
    });
}