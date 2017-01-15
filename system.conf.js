SystemJS.config({
    baseURL: '/dist',
    meta: {
        'clock.js': {
            globals: {
                moment: '../node_modules/moment-timezone/builds/moment-timezone-with-data.js'
            }
        },
        'mirror.js': {
            globals: {
                jquery: '../node_modules/jquery/dist/jquery.js'
            }
        },
        'voiceService.js': {
            globals: {
                annyang: '//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js'
            }
        },
        'calendar.js': {
            globals: {
                moment: '../node_modules/moment-timezone/builds/moment-timezone-with-data.js'
            }
        },
        'newsService.js': {
            globals: {
                jquery: '../node_modules/jquery/dist/jquery.js',
            }
        }
    },
});

SystemJS.defaultJSExtensions = true;
SystemJS.import('mirror.js');