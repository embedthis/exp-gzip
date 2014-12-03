/*
    expansive.es - Configuration for exp-gzip

    Compress final content
 */
Expansive.load({
    expansive: {
        transforms: {
            name:   'compress',
            input:   '*',
            output:  '*',
            files:   [ '**' ],
            script: `
                function transform(contents, meta, service) {
                    let file = meta.file
                    if (file.glob(service.files)) {
                        if (file.childOf(expansive.directories.public)) {
                            file.remove()
                        }
                        let gzip = Cmd.locate('gzip')
                        if (gzip) {
                            contents = run(gzip + ' -c', contents)
                            if (meta.public.extension != '.gz') {
                                meta.public = meta.public.joinExt('gz', true)
                            }
                        } else {
                            trace('Warn', 'Cannot find gzip')
                            service.enable = false
                        }
                    }
                    return contents
                }
            `
        }
    }
})
