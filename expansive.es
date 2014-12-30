/*
    expansive.es - Configuration for exp-gzip

    Compress final content
 */
Expansive.load({
    transforms: {
        name:   'compress',
        files:  [ '**.html', '**.css', '**.js' ],
        script: `
            function post(meta, service) {
                let gzip = Cmd.locate('gzip')
                if (!gzip) {
                    trace('Warn', 'Cannot find gzip')
                    return
                }
                for each (file in directories.public.files(service.files, {directories: false})) {
                    Cmd.run('gzip ' + file, {filter: true})
                }
            }
        `
    }
})
